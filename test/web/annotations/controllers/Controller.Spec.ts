import "reflect-metadata";
import { describe, it, afterEach } from "mocha";
import { expect } from "chai";
import { METADATA_KEY } from "inversify";
import { container } from "inversify-global-container";
import sinon from "sinon";
import faker from "faker";
import { Controller } from "../../../../src/ExpressBoot";
import { METADATA_KEYS } from "../../../../src/web/annonations/metadata/MetadataKeys";
import { ControllerMetadata } from "../../../../src/web/annonations/metadata/ControllerMetadata";
import { BaseController } from "../../../../src/web/controllers/BaseController";
import { COMPONENT_NAMES } from "../../../../src/web/annonations/constants/ComponentNames";

describe("controller specs", () => {

    const sandBox = sinon.createSandbox();

    afterEach(() => {
       sandBox.verifyAndRestore();
    });

    it("should annotate given class with inversifyjs and controller tags", () => {

        const path = faker.random.word();
        const whenTargetNamed = sandBox.stub();
        const to = sandBox.stub().returns({ whenTargetNamed });
        const bind = sandBox.stub(container, "bind").callsFake(() => { return { to }; });

        @Controller(path)
        class Mock extends BaseController { constructor() { super(); } }

        expect(Reflect.hasOwnMetadata(METADATA_KEY.PARAM_TYPES, Mock)).to.equal(true);
        expect(bind.calledWithExactly(COMPONENT_NAMES.CONTROLLER)).to.equal(true);
        expect(to.calledWithExactly(Mock)).to.equal(true);
        expect(whenTargetNamed.calledWithExactly(Mock.name)).to.equal(true);

        const metadata: ControllerMetadata = Reflect.getMetadata(METADATA_KEYS.CONTROLLER, Mock);

        expect(metadata.target).to.equal(Mock);
        expect(metadata.path).to.equal(path);
    });

    it("should throw error when path is not a string", () => {

        const fn = () => {

            @Controller(undefined)
            class Mock extends BaseController { constructor() { super(); } }
        };

        expect(fn).to.throws(`An error occurred annotating Mock as @Controller. Error: Path cannot be empty`);
    });

    it("should throw error when class annotated more than once", () => {

        const path = faker.random.word();

        const fn = () => {

            @Controller(path)
            @Controller(path)
            class Mock extends BaseController { constructor() { super(); } }
        };

        expect(fn).to.throws(`An error occurred annotating Mock as @Controller. Error: Class 'Mock' already annotated`);
    });
});
