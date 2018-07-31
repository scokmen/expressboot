import { container } from "inversify-global-container";
import { Class } from "../types/Class";
import { Injectable } from "./Injectable";

/**
 * @function
 * Annotate given class as component
 * @param {Class} target
 * @returns {void}
 * @throws {Error}
 */
export function Component(target: Class): void {
    try {
        Injectable(target);
    } catch (err) {
        throw new Error(`An error occurred annotating ${target.name} as @Component. Error: ${(<Error>err).message}`);
    }
    container.bind(target.name).to(target);
}
