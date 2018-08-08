import express from "express";
import { IParameterResolver } from "./interfaces/IParameterResolver";
import * as check from "check-types";

/**
 * @class
 * Body parameter resolver
 */
export class BodyParameterResolver implements IParameterResolver {

    /**
     * Resolve parameter with given arguments from body
     * @param {express.Request} request
     * @param {any[]} parameters
     * @returns {any}
     */
    public resolve(request: express.Request, parameters: any[]): any {

        if (!check.object(request)) {
            throw new Error("Request is invalid.");
        }

        return request.body;
    }
}
