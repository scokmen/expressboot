import { ParameterSource } from "../../common/ParameterSource";

/**
 * @interface
 * Parameter metadata
 */
export interface ParameterMetadata {
    args: any[];
    source: ParameterSource;
    index: number;
    methodName: string;
}
