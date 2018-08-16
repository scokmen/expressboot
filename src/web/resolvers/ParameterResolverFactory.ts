import { IParameterResolverFactory } from "./interfaces/IParameterResolverFactory";
import { ParameterSource } from "../common/ParameterSource";
import { BodyParameterResolver } from "./BodyParameterResolver";
import { HeaderParameterResolver } from "./HeaderParameterResolver";
import { RouteParameterResolver } from "./RouteParameterResolver";
import { QueryParameterResolver } from "./QueryParameterResolver";
import { IParameterResolver } from "./interfaces/IParameterResolver";

/**
 * @class
 * Parameter resolver factory
 */
export class ParameterResolverFactory implements IParameterResolverFactory {

    /**
     * Create a parameter resolver for given type
     * @param {ParameterSource} source
     * @returns {IParameterResolver}
     * @throws {Error}
     */
    create(source: ParameterSource): IParameterResolver {
        switch (source) {
            case ParameterSource.Body: return new BodyParameterResolver();
            case ParameterSource.Query: return new QueryParameterResolver();
            case ParameterSource.Header: return new HeaderParameterResolver();
            case ParameterSource.Route: return new RouteParameterResolver();
            default: throw new Error(`Invalid parameter type: ${source}`);
        }
    }
}
