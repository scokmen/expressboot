import { ParameterMetadata } from "./ParameterMetadata";

/**
 * @interface
 * Parameter metadata collection
 */
export interface ParameterMetadataSet {
    [name: string]: ParameterMetadata[];
}
