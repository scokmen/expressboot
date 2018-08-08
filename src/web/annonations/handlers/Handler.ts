import { HandlerMetadata } from "../metadata/HandlerMetadata";
import { IHandlerDecorator } from "../interfaces/IHandlerDecorator";
import { Class } from "../../../types/Class";
import { METADATA_KEYS } from "../metadata/MetadataKeys";
import * as check from "check-types";
import { HttpMethod } from "../../common/HttpMethod";

/**
 * @function
 * Annotate target method as a http handler
 * @param {HttpMethod} method
 * @param {string} path
 * @returns {IHandlerDecorator}
 * @throws {Error}
 */
export function Handler(method: HttpMethod, path: string): IHandlerDecorator {

    return function (target: Class, methodName: string): void {

        const methodSignature = `${target.constructor.name}.${methodName}(...)`;

        if (check.not.string(path)) {
            throw new Error(`An error occurred annotating ${methodSignature} as '${method}' handler. Error: Path cannot be empty`);
        }

        let handlerMetadataList: HandlerMetadata[] = [];
        const metadata: HandlerMetadata = { path, httpMethod: method, target, methodName };

        if (Reflect.hasOwnMetadata(METADATA_KEYS.HANDLER, target.constructor)) {
            handlerMetadataList = Reflect.getOwnMetadata(METADATA_KEYS.HANDLER, target.constructor);
            const previouslyHandlerMetadata = handlerMetadataList.find((handlerMetadata) => { return handlerMetadata.methodName === methodName; });
            if (previouslyHandlerMetadata) {
                throw new Error(`An error occurred annotating ${methodSignature} as '${method}' handler. Error: Class ${methodSignature} already annotated as handler`);
            }
        } else {
            Reflect.defineMetadata(METADATA_KEYS.HANDLER, handlerMetadataList, target.constructor);
        }

        handlerMetadataList.push(metadata);
    };
}
