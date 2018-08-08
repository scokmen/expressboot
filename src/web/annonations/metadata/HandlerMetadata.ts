import { HttpMethod } from "../../common/HttpMethod";

/**
 * @interface
 * Handler metadata
 */
export interface HandlerMetadata {
    path: string;
    target: Object;
    httpMethod: HttpMethod;
    methodName: string;
}
