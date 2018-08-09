import express from "express";
import { IHttpResult } from "./interfaces/IHttpResult";
import { HttpStatusCode } from "../common/HttpStatusCode";

/**
 * @class
 * Content result
 */
export class ContentResult implements IHttpResult {

    private readonly code: HttpStatusCode;
    private readonly contentType: string;
    private readonly content: Object;

    /**
     * @constructor
     * @param {HttpStatusCode} code
     * @param {string} contentType
     * @param {Object} content
     */
    constructor(code: HttpStatusCode, contentType: string, content: Object) {
        this.code = code;
        this.contentType = contentType;
        this.content = content;
    }

    /**
     * Send the status code response
     * @param {express.Result} response
     * @returns {void}
     */
    public send(response: express.Response): void {
        response.contentType(this.contentType);
        response.status(this.code).send(this.content);
    }
}
