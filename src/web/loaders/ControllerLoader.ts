import { Container, interfaces } from "inversify";
import { BaseController } from "../controllers/BaseController";
import { COMPONENT_NAMES } from "../annonations/constants/ComponentNames";
import { IControllerLoader } from "./interfaces/IControllerLoader";
import { ControllerContext } from "../ControllerContext";

/**
 * @class
 * Controller loader
 */
export class ControllerLoader implements IControllerLoader {

    private readonly container: interfaces.Container;

    /**
     * @constructor
     * @param {Container} container
     */
    constructor(container: interfaces.Container) {
        this.container = container;
    }

    /**
     * Load all controllers
     * @returns {ControllerContext[]}
     */
    loadAll(): ControllerContext[] {
        const controllers = this.container.getAll<BaseController>(COMPONENT_NAMES.CONTROLLER);
        return controllers.map((controller) => { return new ControllerContext(controller); });
    }
}
