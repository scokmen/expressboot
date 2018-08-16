import "reflect-metadata";
import express, { Express } from "express";
import compression from "compression";
import bodyParser from "body-parser";
import helmet from "helmet";
import { interfaces } from "inversify";
import { container as globalContainer } from "inversify-global-container";
import { BaseController } from "./controllers/BaseController";
import { COMPONENT_NAMES } from "./annonations/constants/ComponentNames";
import { METADATA_KEYS } from "./annonations/metadata/MetadataKeys";
import { ControllerMetadata } from "./annonations/metadata/ControllerMetadata";
import { HandlerMetadata } from "./annonations/metadata/HandlerMetadata";
import { ParameterMetadataSet } from "./annonations/metadata/ParameterMetadataSet";
import { ParameterMetadata } from "./annonations/metadata/ParameterMetadata";
import { IParameterResolverFactory } from "./resolvers/interfaces/IParameterResolverFactory";
import { ParameterResolverFactory } from "./resolvers/ParameterResolverFactory";
import { IParameterResolver } from "./resolvers/interfaces/IParameterResolver";
import * as check from "check-types";
import { IHttpResult } from "./results/interfaces/IHttpResult";
import { StringResult } from "./results/StringResult";
import { HttpStatusCode } from "./common/HttpStatusCode";
import { JsonResult } from "./results/JsonResult";

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
        application.use(helmet());
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
        const handlerPath = `/${controllerMetadata.path}${handlerMetadata.path}`;
        const handler = this.getHandler(controllerMetadata, handlerMetadata, parameterMetadatas);
        (this.application as any)[handlerMetadata.httpMethod](handlerPath, handler);
    }

    private getHandler(controllerMetadata: ControllerMetadata, handlerMetadata: HandlerMetadata, parameterMetadataList: ParameterMetadata[]): express.RequestHandler {
        const self = this;
        return function (request: express.Request, response: express.Response): void {
            const controller: BaseController = self.container.getNamed<BaseController>(COMPONENT_NAMES.CONTROLLER, controllerMetadata.target.name);
            const handlerArguments: any[] = self.getHandlerArguments(request, parameterMetadataList);
            const handlerResult: any = (controller as any)[handlerMetadata.methodName](...handlerArguments);
            self.handleResult(response, handlerResult);
        };
    }

    private getHandlerArguments(request: express.Request, parameterMetadataList: ParameterMetadata[]): any[] {
        const parameterResolverFactory: IParameterResolverFactory = new ParameterResolverFactory();
        return parameterMetadataList.map((parameterMetadata) => {
            const parameterResolver: IParameterResolver = parameterResolverFactory.create(parameterMetadata.source);
            return parameterResolver.resolve(request, parameterMetadata.args);
        });
    }

    private isHttpResult(result: any): result is IHttpResult {
        return check.object(result) && check.function(result.send);
    }

    private handleResult(response: express.Response, result: any): void {
        if (!response.headersSent) {
            if (result instanceof Promise) {
                result.then((data: any) => { this.handleResult(response, data); });
            } else if (this.isHttpResult(result)) {
                result.send(response);
            } else if (check.primitive(result)) {
                new StringResult(HttpStatusCode.Ok, String(result)).send(response);
            } else if (check.array(result) || check.object(result)) {
                new JsonResult(HttpStatusCode.Ok, result).send(response);
            }
        }
    }
}
