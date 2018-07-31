import { HTTP_METHODS } from "./HttpMethods";
import { Handler } from "./Handler";
import { IHandlerDecorator } from "../interfaces/IHandlerDecorator";

/**
 * @function
 * Annotate target httpMethod as delete handler
 * @param {string} path
 * @returns {IHandlerDecorator}
 */
export function Delete(path: string): IHandlerDecorator {
    return Handler(HTTP_METHODS.DELETE, path);
}
