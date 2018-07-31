import { ControllerContext } from "../../ControllerContext";

/**
 * @interface
 * Controller loader interface
 */
export interface IControllerLoader {

    /**
     * Load all controllers
     * @returns {ControllerContext[]}
     */
    loadAll(): ControllerContext[];
}
