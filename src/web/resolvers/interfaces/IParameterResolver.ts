import express from "express";

/**
 * @interface
 * Parameter resolver
 */
export interface IParameterResolver {

    /**
     * Resolve parameter with given arguments
     * @param {express.Request} request
     * @param {any[]} parameters
     * @returns {any}
     */
    resolve(request: express.Request, parameters: any[]): any;
}
