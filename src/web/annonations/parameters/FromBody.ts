import { Parameter } from "./Parameter";
import { IParameterDecorator } from "../interfaces/IParameterDecorator";
import { ParameterSource } from "../../common/ParameterSource";

/**
 * @function
 * Annotate target parameter as http body parameter
 * @returns {IParameterDecorator}
 * @throws {Error}
 */
export function FromBody(): IParameterDecorator {
    return Parameter(ParameterSource.Body);
}
