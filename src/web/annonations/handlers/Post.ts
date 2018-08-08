import { Handler } from "./Handler";
import { IHandlerDecorator } from "../interfaces/IHandlerDecorator";
import { HttpMethod } from "../../common/HttpMethod";

/**
 * @function
 * Annotate target method as http post handler
 * @param {string} path
 * @returns {IHandlerDecorator}
 */
export function Post(path: string): IHandlerDecorator {
    return Handler(HttpMethod.Post, path);
}
