import "reflect-metadata";
import { describe, it, afterEach } from "mocha";
import { expect } from "chai";
import sinon from "sinon";
import { IParameterResolver } from "../../../src/web/factories/interfaces/IParameterResolver";
import { BodyParameterResolver } from "../../../src/web/factories/BodyParameterResolver";

describe("body parameter resolver specs", () => {

    const sandBox = sinon.createSandbox();

    afterEach(() => {
       sandBox.verifyAndRestore();
    });

    it("should throw error when request is not an object", () => {

        const request: any = undefined;
        const bodyParameterResolver: IParameterResolver = new BodyParameterResolver();

        const fn = () => { bodyParameterResolver.resolve(request, []); };

        expect(fn).to.throws("Request is invalid.");
    });

    it("should return request body", () => {

        const body = { };
        const request: any = { body };
        const bodyParameterResolver: IParameterResolver = new BodyParameterResolver();

        const result = bodyParameterResolver.resolve(request, []);

        expect(result).to.equal(body);
    });
});
