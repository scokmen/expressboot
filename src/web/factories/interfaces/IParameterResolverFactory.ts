import { ParameterSource } from "../../common/ParameterSource";
import { IParameterResolver } from "./IParameterResolver";

/**
 * @interface
 * Parameter resolver factory
 */
export interface IParameterResolverFactory {

    /**
     * Create a parameter resolver for given type
     * @param {ParameterSource} source
     * @returns {IParameterResolver}
     */
    create(source: ParameterSource): IParameterResolver;
}
