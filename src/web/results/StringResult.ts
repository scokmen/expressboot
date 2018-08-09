import { HttpStatusCode } from "../common/HttpStatusCode";
import { ContentResult } from "./ContentResult";

/**
 * @class
 * String result
 */
export class StringResult extends ContentResult {

    /**
     * @constructor
     * @param {HttpStatusCode} code
     * @param {Object} content
     */
    constructor(code: HttpStatusCode, content: String) {
        super(code, "text/plain", content);
    }
}
