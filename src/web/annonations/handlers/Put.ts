import { HTTP_METHODS } from "./HttpMethods";
import { Handler } from "./Handler";
import { IHandlerDecorator } from "../interfaces/IHandlerDecorator";

/**
 * @function
 * Annotate target httpMethod as put handler
 * @param {string} path
 * @returns {IHandlerDecorator}
 */
export function Put(path: string): IHandlerDecorator {
    return Handler(HTTP_METHODS.PUT, path);
}
