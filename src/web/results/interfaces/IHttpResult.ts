import express from "express";

/**
 * @interface
 * Http result interface
 */
export interface IHttpResult {

    /**
     * Send the response
     * @param {express.Result} response
     * @returns {void}
     */
    send(response: express.Response): void;
}
