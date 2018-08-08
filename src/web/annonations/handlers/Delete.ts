import { Handler } from "./Handler";
import { IHandlerDecorator } from "../interfaces/IHandlerDecorator";
import { HttpMethod } from "../../common/HttpMethod";

/**
 * @function
 * Annotate target method as http delete handler
 * @param {string} path
 * @returns {IHandlerDecorator}
 */
export function Delete(path: string): IHandlerDecorator {
    return Handler(HttpMethod.Delete, path);
}
