import { Class } from "../types/Class";

/**
 * @interface
 * class decorator
 */
export interface IClassDecorator<T = any> {

    (target: Class<T>): Class<T>;
}
