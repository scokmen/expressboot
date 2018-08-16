import "reflect-metadata";
import { describe, it, afterEach } from "mocha";
import { expect } from "chai";
import sinon from "sinon";
import faker from "faker";
import { IParameterResolver } from "../../../src/web/resolvers/interfaces/IParameterResolver";
import { RouteParameterResolver } from "../../../src/web/resolvers/RouteParameterResolver";

    describe("route parameter resolver specs", () => {

    const sandBox = sinon.createSandbox();

    afterEach(() => {
       sandBox.verifyAndRestore();
    });

    it("should throw error when request is not an object", () => {

        const request: any = undefined;
        const routeParameterResolver: IParameterResolver = new RouteParameterResolver();

        const fn = () => { routeParameterResolver.resolve(request, []); };

        expect(fn).to.throws("Request is invalid.");
    });

    it("should throw error when route name is invalid", () => {

        const request: any = { };
        const routeParameterResolver: IParameterResolver = new RouteParameterResolver();

        const fn = () => { routeParameterResolver.resolve(request, []); };

        expect(fn).to.throws("Argument is invalid.");
    });

    it("should return route with given name", () => {

        const route = faker.random.word();
        const request: any = { params: { route } };
        const routeParameterResolver: IParameterResolver = new RouteParameterResolver();

        const result = routeParameterResolver.resolve(request, ["route"]);

        expect(result).to.equal(route);
    });
});
