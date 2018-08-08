import { Handler } from "./Handler";
import { IHandlerDecorator } from "../interfaces/IHandlerDecorator";
import { HttpMethod } from "../../common/HttpMethod";

/**
 * @function
 * Annotate target method as http options handler
 * @param {string} path
 * @returns {IHandlerDecorator}
 */
export function Options(path: string): IHandlerDecorator {
    return Handler(HttpMethod.Options, path);
}
