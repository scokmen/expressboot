import "reflect-metadata";
import { describe, it, afterEach } from "mocha";
import { expect } from "chai";
import sinon from "sinon";
import faker from "faker";
import { IParameterResolver } from "../../../src/web/factories/interfaces/IParameterResolver";
import { HeaderParameterResolver } from "../../../src/web/factories/HeaderParameterResolver";

describe("header parameter resolver specs", () => {

    const sandBox = sinon.createSandbox();

    afterEach(() => {
       sandBox.verifyAndRestore();
    });

    it("should throw error when request is not an object", () => {

        const request: any = undefined;
        const headerParameterResolver: IParameterResolver = new HeaderParameterResolver();

        const fn = () => { headerParameterResolver.resolve(request, []); };

        expect(fn).to.throws("Request is invalid.");
    });

    it("should throw error when header name is invalid", () => {

        const request: any = { };
        const headerParameterResolver: IParameterResolver = new HeaderParameterResolver();

        const fn = () => { headerParameterResolver.resolve(request, []); };

        expect(fn).to.throws("Argument is invalid.");
    });

    it("should return header with given name", () => {

        const userAgent = faker.random.word();
        const request: any = { headers: { userAgent } };
        const headerParameterResolver: IParameterResolver = new HeaderParameterResolver();

        const result = headerParameterResolver.resolve(request, ["userAgent"]);

        expect(result).to.equal(userAgent);
    });
});
