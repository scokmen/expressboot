/**
 * @interface
 * Controller decorator interface
 */
export interface IHandlerDecorator {
    (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>): void;
}
