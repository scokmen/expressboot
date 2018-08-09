import { HttpStatusCode } from "../common/HttpStatusCode";
import { ContentResult } from "./ContentResult";

/**
 * @class
 * Json result
 */
export class JsonResult extends ContentResult {

    /**
     * @constructor
     * @param {HttpStatusCode} code
     * @param {Object} content
     */
    constructor(code: HttpStatusCode, content: Object) {
        super(code, "application/json", content);
    }
}
