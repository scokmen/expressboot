import { IHandlerDecorator } from "../interfaces/IHandlerDecorator";
import { HTTP_METHODS } from "./HttpMethods";
import { Handler } from "./Handler";

/**
 * @function
 * Annotate target method as get handler
 * @param {string} path
 * @returns {IHandlerDecorator}
 */
export function Get(path: string): IHandlerDecorator {
    return Handler(HTTP_METHODS.GET, path);
}
