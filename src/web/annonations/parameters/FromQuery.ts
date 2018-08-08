import { Parameter } from "./Parameter";
import { IParameterDecorator } from "../interfaces/IParameterDecorator";
import { ParameterSource } from "../../common/ParameterSource";

/**
 * @function
 * Annotate target parameter as http query parameter
 * @param {string} name
 * @returns {IParameterDecorator}
 * @throws {Error}
 */
export function FromQuery(name: string): IParameterDecorator {
    return Parameter(ParameterSource.Query, name);
}
