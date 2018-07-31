import { Class } from "../../../types/Class";
import { BaseController } from "../../controllers/BaseController";

/**
 * Controller metadata
 */
export interface ControllerMetadata {
    path: string;
    version?: string;
    target: Class<BaseController>;
}
