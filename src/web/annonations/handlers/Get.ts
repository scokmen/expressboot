import { Handler } from "./Handler";
import { IHandlerDecorator } from "../interfaces/IHandlerDecorator";
import { HttpMethod } from "../../common/HttpMethod";

/**
 * @function
 * Annotate target method as http get handler
 * @param {string} path
 * @returns {IHandlerDecorator}
 */
export function Get(path: string): IHandlerDecorator {
    return Handler(HttpMethod.Get, path);
}
