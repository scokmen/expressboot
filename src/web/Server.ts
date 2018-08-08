import "reflect-metadata";
import express, { Express } from "express";
import compression from "compression";
import bodyParser from "body-parser";
import { interfaces } from "inversify";
import { container as globalContainer } from "inversify-global-container";
import { BaseController } from "./controllers/BaseController";
import { COMPONENT_NAMES } from "./annonations/constants/ComponentNames";
import { METADATA_KEYS } from "./annonations/metadata/MetadataKeys";
import { ControllerMetadata } from "./annonations/metadata/ControllerMetadata";
import { HandlerMetadata } from "./annonations/metadata/HandlerMetadata";
import { ParameterMetadataSet } from "./annonations/metadata/ParameterMetadataSet";
import { ParameterMetadata } from "./annonations/metadata/ParameterMetadata";
import { IParameterResolverFactory } from "./factories/interfaces/IParameterResolverFactory";
import { ParameterResolverFactory } from "./factories/ParameterResolverFactory";
import { IParameterResolver } from "./factories/interfaces/IParameterResolver";

/**
 * @class
 * Server
 */
export abstract class Server {

    private readonly port: number;
    private readonly name: string;
    private readonly container: interfaces.Container;
    private readonly application: Express;

    /**
     * @constructor
     * @param {string} name
     * @param {number} port
     */
    protected constructor(name: string, port: number) {
        this.port = port;
        this.name = name;
        this.container = globalContainer;
        this.application = this.createApplication();
        this.registerControllers();
    }

    /**
     * Start the application
     * @returns {void}
     */
    public start(): void {
        this.application.listen(this.application.get("port"));
    }

    /**
     * Get application port
     * @returns {number}
     */
    public getPort(): number {
        return this.port;
    }

    /**
     * Get application name
     * @returns {string}
     */
    public getName(): string {
        return this.name;
    }

    /**
     * Get application
     * @returns {Express}
     */
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
        const controllers = this.container.getAll<BaseController>(COMPONENT_NAMES.CONTROLLER);
        controllers.forEach(controller => this.registerController(controller));
    }

    private registerController(controller: BaseController): void {
        const controllerMetadata: ControllerMetadata = Reflect.getMetadata(METADATA_KEYS.CONTROLLER, controller.constructor);
        const handlerMetadataList: HandlerMetadata[] = Reflect.getMetadata(METADATA_KEYS.HANDLER, controller.constructor);
        const controllerParameterSet: ParameterMetadataSet = Reflect.getMetadata(METADATA_KEYS.PARAMETER, controller.constructor);
        if (controllerMetadata && handlerMetadataList) {
            handlerMetadataList.forEach((handlerMetadata) => {
                this.registerHandler(controllerMetadata, handlerMetadata, controllerParameterSet[handlerMetadata.methodName] || []); });
        }
    }

    private registerHandler(controllerMetadata: ControllerMetadata, handlerMetadata: HandlerMetadata, parameterMetadatas: ParameterMetadata[]): void {
        const controller = this.container.getNamed<BaseController>(COMPONENT_NAMES.CONTROLLER, controllerMetadata.target.name);
        const handlerPath = `/${controllerMetadata.path}${handlerMetadata.path}`;
        const handler = this.getHandler(controller, handlerMetadata, parameterMetadatas);
        (this.application as any)[handlerMetadata.httpMethod](handlerPath, handler);
    }

    private getHandler(controller: BaseController, handlerMetadata: HandlerMetadata, parameterMetadataList: ParameterMetadata[]): express.RequestHandler {
        const self = this;
        return function (request: express.Request, response: express.Response): void {
            const handlerArguments: any[] = self.getHandlerArguments(request, parameterMetadataList);
            const handlerResult: any = (controller as any)[handlerMetadata.methodName](...handlerArguments);
            response.send(handlerResult);
        };
    }

    private getHandlerArguments(request: express.Request, parameterMetadatas: ParameterMetadata[]): any[] {
        const parameterResolverFactory: IParameterResolverFactory = new ParameterResolverFactory();
        return parameterMetadatas.map((parameterMetadata) => {
            const parameterResolver: IParameterResolver = parameterResolverFactory.create(parameterMetadata.source);
            return parameterResolver.resolve(request, parameterMetadata.args);
        });
    }
}
