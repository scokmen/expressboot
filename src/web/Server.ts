import "reflect-metadata";
import express, { Express } from "express";
import compression from "compression";
import bodyParser from "body-parser";
import { interfaces } from "inversify";
import { container as globalContainer } from "inversify-global-container";
import { Class } from "../types/Class";
import { ControllerMetadata } from "./annonations/metadata/ControllerMetadata";
import { HandlerMetadata } from "./annonations/metadata/HandlerMetadata";
import { METADATA_KEYS } from "./annonations/metadata/MetadataKeys";
import { COMPONENT_NAMES } from "./annonations/constants/ComponentNames";
import { IControllerLoader } from "./loaders/interfaces/IControllerLoader";
import { ControllerLoader } from "./loaders/ControllerLoader";

/**
 * @class
 * Server
 */
export abstract class Server {

    private readonly port: number;
    private readonly name: string;
    private readonly container: interfaces.Container;
    private readonly application: Express;
    private readonly controllerLoader: IControllerLoader;

    /**
     * @constructor
     * @param {string} name
     * @param {number} port
     */
    protected constructor(name: string, port: number) {
        this.port = port;
        this.name = name;
        this.container = globalContainer;
        this.controllerLoader = new ControllerLoader(this.container);
        this.application = this.createApplication();

        this.registerControllers();
    }

    public start(): void {
        this.application.listen(this.application.get("port"));
    }

    public getPort(): number {
        return this.port;
    }

    public getName(): string {
        return this.name;
    }

    public getApplication(): Express {
        return this.application;
    }

    private createApplication(): Express {
        const application = express();
        application.set("port", this.getPort());
        application.use(compression());
        application.use(bodyParser.json());
        application.use(bodyParser.urlencoded({extended: true}));
        return application;
    }

    private registerControllers(): void {
       this.controllerLoader.loadAll().forEach((cc) => { cc.register(this.application); });
    }
}
