import { Class } from "../../../types/Class";
import { BaseController } from "../../controllers/BaseController";

/**
 * @interface
 * Controller decorator interface
 */
export interface IControllerDecorator<T extends BaseController> {
    (target: Class<T>): void;
}
