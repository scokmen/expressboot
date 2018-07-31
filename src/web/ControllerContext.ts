import { BaseController } from "./controllers/BaseController";
import { Express } from "express";
import { ControllerMetadata } from "./annonations/metadata/ControllerMetadata";
import { METADATA_KEYS } from "./annonations/metadata/MetadataKeys";
import { HandlerMetadata } from "./annonations/metadata/HandlerMetadata";
import express from "express";

export class ControllerContext {

    private controller: BaseController;

    constructor(controller: BaseController) {
        this.controller = controller;
    }

    public register(application: Express) {
        const controllerMetadata: ControllerMetadata = Reflect.getOwnMetadata(METADATA_KEYS.CONTROLLER, this.controller.constructor);
        const handlerMetadataList: HandlerMetadata[] = Reflect.getOwnMetadata(METADATA_KEYS.HANDLER, this.controller.constructor);
        if (controllerMetadata && handlerMetadataList) {
            handlerMetadataList.forEach((handlerMetadata: HandlerMetadata) => {
               // TODO ...
            });
        }
    }
}
