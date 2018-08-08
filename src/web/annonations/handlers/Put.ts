import { Handler } from "./Handler";
import { IHandlerDecorator } from "../interfaces/IHandlerDecorator";
import { HttpMethod } from "../../common/HttpMethod";

/**
 * @function
 * Annotate target method as http put handler
 * @param {string} path
 * @returns {IHandlerDecorator}
 */
export function Put(path: string): IHandlerDecorator {
    return Handler(HttpMethod.Put, path);
}
