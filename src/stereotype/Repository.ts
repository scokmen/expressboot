import { IClassDecorator } from "./IClassDecorator";
import { Component } from "./Component";

/**
 * @function
 * @param {String} identifier
 * @return {IClassDecorator}
 */
export function Repository<T>(identifier: String): IClassDecorator<T> {

    return Component<T>(identifier);
}
