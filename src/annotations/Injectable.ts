import { Class } from "../types/Class";
import { decorate, injectable, METADATA_KEY } from "inversify";

/**
 * @function
 * Annotate given class as injectable
 * @param {Class} target
 * @returns {void}
 * @throws {Error}
 */
export function Injectable(target: Class): void {
    if (Reflect.hasOwnMetadata(METADATA_KEY.PARAM_TYPES, target)) {
        throw new Error(`Class '${target.name}' already annotated`);
    }
    decorate(injectable(), target);
}
