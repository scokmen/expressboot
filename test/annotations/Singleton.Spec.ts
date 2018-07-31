import "reflect-metadata";
import { describe, it, afterEach } from "mocha";
import { expect } from "chai";
import { Singleton } from "./../../src/ExpressBoot";
import { METADATA_KEY } from "inversify";
import { container } from "inversify-global-container";
import sinon from "sinon";

describe("singleton specs", () => {

    const sandBox = sinon.createSandbox();

    afterEach(() => {
        sandBox.verifyAndRestore();
    });

    it("should annotate given class with inversifyjs tags", () => {

        const inSingletonScope = sandBox.stub();
        const to = sandBox.stub().returns({ inSingletonScope });
        const bind = sandBox.stub(container, "bind").callsFake(() => { return { to }; });

        @Singleton
        class Mock { }

        expect(Reflect.hasOwnMetadata(METADATA_KEY.PARAM_TYPES, Mock)).to.equal(true);
        expect(bind.calledWithExactly(Mock.name)).to.equal(true);
        expect(to.calledWithExactly(Mock)).to.equal(true);
        expect(inSingletonScope.calledWithExactly()).to.equal(true);
    });

    it("should throw error when class annotated more than once", () => {

        const fn = () => {

            @Singleton
            @Singleton
            class Mock { }
        };

        expect(fn).to.throws(`An error occurred annotating Mock as @Singleton. Error: Class 'Mock' already annotated`);
    });
});
