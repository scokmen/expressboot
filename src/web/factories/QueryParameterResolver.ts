import express from "express";
import { IParameterResolver } from "./interfaces/IParameterResolver";
import * as check from "check-types";

/**
 * @class
 * Query parameter resolver
 */
export class QueryParameterResolver implements IParameterResolver {

    /**
     * Resolve parameter with given arguments from query
     * @param {express.Request} request
     * @param {any[]} parameters
     * @returns {any}
     */
    public resolve(request: express.Request, parameters: any[]): any {

        if (!check.object(request)) {
            throw new Error("Request is invalid.");
        }

        if (!Array.isArray(parameters) || !check.string(parameters[0])) {
            throw new Error("Argument is invalid.");
        }

        return request.query[parameters[0]];
    }
}
