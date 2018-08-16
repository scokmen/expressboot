import "reflect-metadata";
import { describe, it, afterEach } from "mocha";
import { expect } from "chai";
import sinon from "sinon";
import faker from "faker";
import { IParameterResolver } from "../../../src/web/resolvers/interfaces/IParameterResolver";
import { QueryParameterResolver } from "../../../src/web/resolvers/QueryParameterResolver";

    describe("query parameter resolver specs", () => {

    const sandBox = sinon.createSandbox();

    afterEach(() => {
       sandBox.verifyAndRestore();
    });

    it("should throw error when request is not an object", () => {

        const request: any = undefined;
        const queryParameterResolver: IParameterResolver = new QueryParameterResolver();

        const fn = () => { queryParameterResolver.resolve(request, []); };

        expect(fn).to.throws("Request is invalid.");
    });

    it("should throw error when query name is invalid", () => {

        const request: any = { };
        const queryParameterResolver: IParameterResolver = new QueryParameterResolver();

        const fn = () => { queryParameterResolver.resolve(request, []); };

        expect(fn).to.throws("Argument is invalid.");
    });

    it("should return query with given name", () => {

        const query = faker.random.word();
        const request: any = { query: { query } };
        const queryParameterResolver: IParameterResolver = new QueryParameterResolver();

        const result = queryParameterResolver.resolve(request, ["query"]);

        expect(result).to.equal(query);
    });
});
