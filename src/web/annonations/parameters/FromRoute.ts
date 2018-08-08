import { Parameter } from "./Parameter";
import { IParameterDecorator } from "../interfaces/IParameterDecorator";
import { ParameterSource } from "../../common/ParameterSource";

/**
 * @function
 * Annotate target parameter as http route
 * @param {string} name
 * @returns {IParameterDecorator}
 * @throws {Error}
 */
export function FromRoute(name: string): IParameterDecorator {
    return Parameter(ParameterSource.Route, name);
}
