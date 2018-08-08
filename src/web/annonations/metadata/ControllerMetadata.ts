import { Class } from "../../../types/Class";
import { BaseController } from "../../controllers/BaseController";

/**
 * @interface
 * Controller metadata
 */
export interface ControllerMetadata {
    path: string;
    version?: string;
    target: Class<BaseController>;
}
