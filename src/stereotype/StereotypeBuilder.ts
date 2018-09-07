import { Stereotype } from "./Stereotype";
import { Class } from "../types/Class";
import { IStereotypeBuilder } from "./IStereotypeBuilder";

/**
 * @class
 * Stereotype builder
 */
export class StereotypeBuilder implements IStereotypeBuilder<Stereotype> {

    protected target: Class;
    protected identifier: String;

    build(): Stereotype {
        return new Stereotype(this.target, this.identifier);
    }

    setTarget(target: Class): IStereotypeBuilder<Stereotype> {
        this.target = target;
        return this;
    }

    setIdentifier(identifier: String): IStereotypeBuilder<Stereotype> {
        this.identifier = identifier;
        return this;
    }
}
