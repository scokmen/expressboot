import express from "express";
import { IHttpResult } from "./interfaces/IHttpResult";
import { HttpStatusCode } from "../common/HttpStatusCode";

/**
 * @class
 * Status result
 */
export class StatusResult implements IHttpResult {

    private readonly code: HttpStatusCode;

    /**
     * @constructor
     * @param {HttpStatusCode} code
     */
    constructor(code: HttpStatusCode) {
        this.code = code;
    }

    /**
     * Send the status code response
     * @param {express.Result} response
     * @returns {void}
     */
    public send(response: express.Response): void {
        response.status(this.code).send();
    }
}
