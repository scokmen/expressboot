import { HandlerMetadata } from "../metadata/HandlerMetadata";
import { IHandlerDecorator } from "../interfaces/IHandlerDecorator";
import { Class } from "../../../types/Class";
import { METADATA_KEYS } from "../metadata/MetadataKeys";
import * as check from "check-types";

/**
 * @function
 * Annotate target httpMethod as handler
 * @param {string} httpMethod
 * @param {string} path
 * @returns {IHandlerDecorator}
 * @throws {Error}
 */
export function Handler(httpMethod: string, path: string): IHandlerDecorator {

    return function (target: Class, methodName: string): void {

        const actionName = `${target.constructor.name}::${methodName}`;

        if (check.not.string(path)) {
            throw new Error(`An error occurred annotating ${actionName} as '${httpMethod}' handler. Error: Path cannot be empty`);
        }

        const metadata: HandlerMetadata = { path, httpMethod, target, methodName };
        let handlerMetadataList: HandlerMetadata[] = [];
        if (Reflect.hasOwnMetadata(METADATA_KEYS.HANDLER, target.constructor)) {
            handlerMetadataList = Reflect.getOwnMetadata(METADATA_KEYS.HANDLER, target.constructor);
            const previouslyHandlerMetadata = handlerMetadataList.find((handlerMetadata) => { return handlerMetadata.methodName === methodName; });
            if (previouslyHandlerMetadata) {
                throw new Error(`An error occurred annotating ${actionName} as '${httpMethod}' handler. Error: Class ${actionName} already annotated as handler`);
            }
        } else {
            Reflect.defineMetadata(METADATA_KEYS.HANDLER, handlerMetadataList, target.constructor);
        }
        handlerMetadataList.push(metadata);
    };
}
