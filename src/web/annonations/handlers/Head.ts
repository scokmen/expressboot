import { Handler } from "./Handler";
import { IHandlerDecorator } from "../interfaces/IHandlerDecorator";
import { HttpMethod } from "../../common/HttpMethod";

/**
 * @function
 * Annotate target method as http head handler
 * @param {string} path
 * @returns {IHandlerDecorator}
 */
export function Head(path: string): IHandlerDecorator {
    return Handler(HttpMethod.Head, path);
}
