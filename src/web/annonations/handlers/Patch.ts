import { Handler } from "./Handler";
import { IHandlerDecorator } from "../interfaces/IHandlerDecorator";
import { HttpMethod } from "../../common/HttpMethod";

/**
 * @function
 * Annotate target method as http patch handler
 * @param {string} path
 * @returns {IHandlerDecorator}
 */
export function Patch(path: string): IHandlerDecorator {
    return Handler(HttpMethod.Patch, path);
}
