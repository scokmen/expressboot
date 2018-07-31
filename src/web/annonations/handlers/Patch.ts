import { HTTP_METHODS } from "./HttpMethods";
import { Handler } from "./Handler";
import { IHandlerDecorator } from "../interfaces/IHandlerDecorator";

/**
 * @function
 * Annotate target httpMethod as patch handler
 * @param {string} path
 * @returns {IHandlerDecorator}
 */
export function Patch(path: string): IHandlerDecorator {
    return Handler(HTTP_METHODS.PATCH, path);
}
