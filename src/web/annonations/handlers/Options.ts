import { HTTP_METHODS } from "./HttpMethods";
import { Handler } from "./Handler";
import { IHandlerDecorator } from "../interfaces/IHandlerDecorator";

/**
 * @function
 * Annotate target httpMethod as options handler
 * @param {string} path
 * @returns {IHandlerDecorator}
 */
export function Options(path: string): IHandlerDecorator {
    return Handler(HTTP_METHODS.OPTIONS, path);
}
