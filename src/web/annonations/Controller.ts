import { container } from "inversify-global-container";
import { IControllerDecorator } from "./interfaces/IControllerDecorator";
import { Class } from "../../types/Class";
import { Injectable } from "../../annotations/Injectable";
import { METADATA_KEYS } from "./metadata/MetadataKeys";
import { ControllerMetadata } from "./metadata/ControllerMetadata";
import * as check from "check-types";
import { BaseController } from "../controllers/BaseController";
import { COMPONENT_NAMES } from "./constants/ComponentNames";

/**
 * @function
 * Annotate target class as a http controller
 * @param {string} path
 * @returns {IControllerDecorator}
 * @throws {Error}
 */
export function Controller<T extends BaseController>(path: string): IControllerDecorator<T> {

    return function(target: Class<T>): void {

        if (check.not.string(path)) {
            throw new Error(`An error occurred annotating ${target.name} as @Controller. Error: Path cannot be empty`);
        }

        try {
            Injectable(target);
        } catch (err) {
            throw new Error(`An error occurred annotating ${target.name} as @Controller. Error: ${(<Error>err).message}`);
        }

        container.bind(COMPONENT_NAMES.CONTROLLER).to(target).whenTargetNamed(target.name);

        const metadata: ControllerMetadata = { path, target };

        Reflect.defineMetadata(METADATA_KEYS.CONTROLLER, metadata, target);
    };
}
