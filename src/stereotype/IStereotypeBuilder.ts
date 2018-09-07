import { Stereotype } from "./Stereotype";
import { Class } from "../types/Class";

/**
 * @interface
 * Stereotype builder
 */
export interface IStereotypeBuilder<T extends Stereotype> {

    build(): T;

    setTarget(target: Class): IStereotypeBuilder<T>;

    setIdentifier(identifier: String): IStereotypeBuilder<T>;
}
