import "reflect-metadata";
import { afterEach, describe, it } from "mocha";
import { expect } from "chai";
import sinon from "sinon";
import faker from "faker";
import { IParameterResolver } from "../../../src/web/resolvers/interfaces/IParameterResolver";
import { QueryParameterResolver } from "../../../src/web/resolvers/QueryParameterResolver";
import { IParameterResolverFactory } from "../../../src/web/resolvers/interfaces/IParameterResolverFactory";
import { ParameterResolverFactory } from "../../../src/web/resolvers/ParameterResolverFactory";
import { ParameterSource } from "../../../src/web/common/ParameterSource";
import { BodyParameterResolver } from "../../../src/web/resolvers/BodyParameterResolver";
import { HeaderParameterResolver } from "../../../src/web/resolvers/HeaderParameterResolver";
import { RouteParameterResolver } from "../../../src/web/resolvers/RouteParameterResolver";

describe("parameter resolver factory specs", () => {

    const sandBox = sinon.createSandbox();

    afterEach(() => {
       sandBox.verifyAndRestore();
    });

    it("should return a query parameter resolver", () => {

        const parameterResolverFactory: IParameterResolverFactory = new ParameterResolverFactory();

        const parameterResolver: IParameterResolver = parameterResolverFactory.create(ParameterSource.Query);

        expect(parameterResolver).to.be.an.instanceOf(QueryParameterResolver);
    });

    it("should return a body parameter resolver", () => {

        const parameterResolverFactory: IParameterResolverFactory = new ParameterResolverFactory();

        const parameterResolver: IParameterResolver = parameterResolverFactory.create(ParameterSource.Body);

        expect(parameterResolver).to.be.an.instanceOf(BodyParameterResolver);
    });

    it("should return a header parameter resolver", () => {

        const parameterResolverFactory: IParameterResolverFactory = new ParameterResolverFactory();

        const parameterResolver: IParameterResolver = parameterResolverFactory.create(ParameterSource.Header);

        expect(parameterResolver).to.be.an.instanceOf(HeaderParameterResolver);
    });

    it("should return a route parameter resolver", () => {

        const parameterResolverFactory: IParameterResolverFactory = new ParameterResolverFactory();

        const parameterResolver: IParameterResolver = parameterResolverFactory.create(ParameterSource.Route);

        expect(parameterResolver).to.be.an.instanceOf(RouteParameterResolver);
    });

    it("should throw error when parameter type is invalid", () => {

        const parameterSource = <ParameterSource>faker.random.word();
        const parameterResolverFactory: IParameterResolverFactory = new ParameterResolverFactory();

        const fn = () => { parameterResolverFactory.create(parameterSource); };

        expect(fn).to.throws(`Invalid parameter type: ${parameterSource}`);
    });
});
