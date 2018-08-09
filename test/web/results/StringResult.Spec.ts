import "reflect-metadata";
import { describe, it, afterEach } from "mocha";
import { expect } from "chai";
import sinon from "sinon";
import faker from "faker";
import { IHttpResult } from "../../../src/web/results/interfaces/IHttpResult";
import { StringResult } from "../../../src/web/results/StringResult";

describe("string result specs", () => {

    const sandBox = sinon.createSandbox();

    afterEach(() => {
       sandBox.verifyAndRestore();
    });

    it("should send status", () => {

        const code = faker.random.number({ min: 200, max: 299 });
        const content = faker.random.word();
        const statusResult: IHttpResult = new StringResult(code, content);

        const sendFn = sinon.stub();
        const statusFn = sinon.stub().returns({ send: sendFn });
        const contentTypeFn = sinon.stub();
        const response = { status: statusFn, contentType: contentTypeFn };

        statusResult.send(<any>response);

        expect(contentTypeFn.calledWithExactly("text/plain")).to.equal(true);
        expect(statusFn.calledWithExactly(code)).to.equal(true);
        expect(sendFn.calledWithExactly(content)).to.equal(true);
    });
});
