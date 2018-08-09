import "reflect-metadata";
import { describe, it, afterEach } from "mocha";
import { expect } from "chai";
import sinon from "sinon";
import faker from "faker";
import { IHttpResult } from "../../../src/web/results/interfaces/IHttpResult";
import { ContentResult } from "../../../src/web/results/ContentResult";

describe("content result specs", () => {

    const sandBox = sinon.createSandbox();

    afterEach(() => {
       sandBox.verifyAndRestore();
    });

    it("should send status", () => {

        const code = faker.random.number({ min: 200, max: 299 });
        const contentType = faker.random.word();
        const content = { };
        const statusResult: IHttpResult = new ContentResult(code, contentType, content);

        const sendFn = sinon.stub();
        const statusFn = sinon.stub().returns({ send: sendFn });
        const contentTypeFn = sinon.stub();
        const response = { status: statusFn, contentType: contentTypeFn };

        statusResult.send(<any>response);

        expect(contentTypeFn.calledWithExactly(contentType)).to.equal(true);
        expect(statusFn.calledWithExactly(code)).to.equal(true);
        expect(sendFn.calledWithExactly(content)).to.equal(true);
    });
});
