/**
 * @interface
 * Handler decorator interface
 */
export interface IHandlerDecorator {
    (target: Object, methodName: string, descriptor: TypedPropertyDescriptor<any>): void;
}
