import { Class } from "../types/Class";

/**
 * @class
 * stereotype
 */
export class Stereotype {

    private readonly target: Class;
    private readonly identifier: String;

    /**
     * @constructor
     * @param {Class} target
     * @param {String} identifier
     */
    constructor(target: Class, identifier: String) {
        this.target = target;
        this.identifier = identifier;
    }

    public getTarget(): Class {
        return this.target;
    }

    public getIdentifier(): String {
        return this.identifier;
    }
}
