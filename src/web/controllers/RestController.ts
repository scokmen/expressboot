import { injectable } from "inversify";
import { BaseController } from "./BaseController";
import { IHttpResult } from "../results/interfaces/IHttpResult";
import * as check from "check-types";
//import { StatusResult } from "../results/StatusCodeResult";
import { StringResult } from "../results/StringResult";
import { JsonResult } from "../results/JsonResult";
import { HttpStatusCode } from "../common/HttpStatusCode";

/**
 * @class
 * Rest controller
 */
@injectable()
export abstract class RestController extends BaseController {

    protected constructor() {
        super();
    }
/*
    protected ok<T>(content?: T): IHttpResult {
        return this.createHttpResult(HttpStatusCode.Ok, content);
    }

    protected created(content?: any): IHttpResult {

    }

    protected badRequest(content?: any): IHttpResult {

    }

    protected notFound(content?: any): IHttpResult {

    }

    protected internalServerError(content?: any): IHttpResult {

    }

    private createHttpResult(code: number, content?: any): IHttpResult {
        if (!check.assigned(content)) {
            return new StatusCodeResult(code);
        } else if (check.string(content)) {
            return new StringResult(code, <String>content);
        } else {
            return new JsonResult(code, <Object>content);
        }
    }
    */
}
