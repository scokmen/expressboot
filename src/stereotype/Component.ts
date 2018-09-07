import { IClassDecorator } from "./IClassDecorator";
import { IStereotypeBuilder } from "./IStereotypeBuilder";
import { StereotypeBuilder } from "./StereotypeBuilder";
import { StereotypeInjector } from "./StereotypeInjector";
import { Stereotype } from "./Stereotype";

/**
 * @function
 * @param {String} identifier
 * @return {IClassDecorator}
 */
export function Component<T>(identifier: String): IClassDecorator<T> {

    const stereotypeBuilder: IStereotypeBuilder<Stereotype> = new StereotypeBuilder();

    stereotypeBuilder.setIdentifier(identifier);

    return StereotypeInjector.createInjector<T>(stereotypeBuilder);
}
