import express from "express";
import { IParameterResolver } from "./interfaces/IParameterResolver";
import * as check from "check-types";

/**
 * @class
 * Route parameter resolver
 */
export class RouteParameterResolver implements IParameterResolver {

    /**
     * Resolve parameter with given arguments from route
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

        return request.params[parameters[0]];
    }
}
