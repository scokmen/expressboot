import "reflect-metadata";
import { describe, it, afterEach } from "mocha";
import { expect } from "chai";
import sinon from "sinon";
import faker from "faker";
import { IHttpResult } from "../../../src/web/results/interfaces/IHttpResult";
import { StatusResult } from "../../../src/web/results/StatusResult";

describe("status result specs", () => {

    const sandBox = sinon.createSandbox();

    afterEach(() => {
       sandBox.verifyAndRestore();
    });

    it("should send status", () => {

        const code = faker.random.number({ min: 200, max: 299 });
        const statusResult: IHttpResult = new StatusResult(code);

        const sendFn = sinon.stub();
        const statusFn = sinon.stub().returns({ send: sendFn });
        const response = { status: statusFn };

        statusResult.send(<any>response);

        expect(statusFn.calledWithExactly(code)).to.equal(true);
        expect(sendFn.calledWithExactly()).to.equal(true);
    });
});
