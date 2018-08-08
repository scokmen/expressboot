import { Parameter } from "./Parameter";
import { IParameterDecorator } from "../interfaces/IParameterDecorator";
import { ParameterSource } from "../../common/ParameterSource";

/**
 * @function
 * Annotate target parameter as http header
 * @param {string} name
 * @returns {IParameterDecorator}
 * @throws {Error}
 */
export function FromHeader(name: string): IParameterDecorator {
    return Parameter(ParameterSource.Header, name);
}
