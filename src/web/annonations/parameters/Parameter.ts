import { Class } from "../../../types/Class";
import { METADATA_KEYS } from "../metadata/MetadataKeys";
import { IParameterDecorator } from "../interfaces/IParameterDecorator";
import { ParameterMetadata } from "../metadata/ParameterMetadata";
import { ParameterMetadataSet } from "../metadata/ParameterMetadataSet";
import { ParameterSource } from "../../common/ParameterSource";

/**
 * @function
 * Annotate target parameter as http parameter
 * @param {ParameterSource} source
 * @param {any[]} args
 * @returns {IParameterDecorator}
 * @throws {Error}
 */
export function Parameter(source: ParameterSource, ...args: any[]): IParameterDecorator {

    return function (target: Class, methodName: string, index: number): void {

        let controllerParameterSet: ParameterMetadataSet = { };
        let methodParameters: ParameterMetadata[] = [];
        const parameterMetadata: ParameterMetadata = { methodName, index, source, args };

        if (Reflect.hasMetadata(METADATA_KEYS.PARAMETER, target.constructor)) {
           controllerParameterSet = Reflect.getMetadata(METADATA_KEYS.PARAMETER, target.constructor);
           methodParameters = controllerParameterSet[methodName] || [];
        }

        methodParameters.unshift(parameterMetadata);
        controllerParameterSet[methodName] = methodParameters;
        Reflect.defineMetadata(METADATA_KEYS.PARAMETER, controllerParameterSet, target.constructor);
    };
}
