/**
 * @interface
 * Parameter decorator interface
 */
export interface IParameterDecorator {
    (target: Object, methodName: string, index: number): void;
}
