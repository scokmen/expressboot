import { Class } from "../types/Class";
import { decorate, injectable, METADATA_KEY } from "inversify";

/**
 * @function
 * Annotate given class as an injectable class
 * @param {Class} target
 * @returns {void}
 * @throws {Error}
 */
export function Injectable<T>(target: Class<T>): void {
    if (Reflect.hasOwnMetadata(METADATA_KEY.PARAM_TYPES, target)) {
        throw new Error(`Class '${target.name}' already annotated as injectable`);
    }
    decorate(injectable(), target);
}
