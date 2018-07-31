import { HTTP_METHODS } from "./HttpMethods";
import { Handler } from "./Handler";
import { IHandlerDecorator } from "../interfaces/IHandlerDecorator";

/**
 * @function
 * Annotate target httpMethod as head handler
 * @param {string} path
 * @returns {IHandlerDecorator}
 */
export function Head(path: string): IHandlerDecorator {
    return Handler(HTTP_METHODS.HEAD, path);
}
