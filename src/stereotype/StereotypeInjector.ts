import { Class } from "../types/Class";
import { IClassDecorator } from "./IClassDecorator";
import { IStereotypeBuilder } from "./IStereotypeBuilder";
import { Stereotype } from "./Stereotype";

/**
 * @class
 * Stereotype injector
 */
export class StereotypeInjector {

    public static createInjector<T = any>(stereotypeBuilder: IStereotypeBuilder<Stereotype>): IClassDecorator<T> {

        return function (target: Class<T>): Class<T> {

            stereotypeBuilder.setTarget(target);

            Reflect.defineMetadata("express:boot:stereotype", stereotypeBuilder.build(), target);

            return target;
        };
    }
}
