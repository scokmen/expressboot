import "reflect-metadata";
import { describe, it, afterEach } from "mocha";
import { expect } from "chai";
import sinon from "sinon";
import faker from "faker";
import { Put } from "../../../../src/ExpressBoot";
import { METADATA_KEYS } from "../../../../src/web/annonations/metadata/MetadataKeys";
import { HandlerMetadata } from "../../../../src/web/annonations/metadata/HandlerMetadata";

describe("put specs", () => {

    const sandBox = sinon.createSandbox();

    afterEach(() => {
       sandBox.verifyAndRestore();
    });

    it("should annotate given method with handler tags", () => {

        const path = faker.random.word();

        class Mock {

            @Put(path)
            public Handler() { }
        }

        const metadataList: HandlerMetadata[] = Reflect.getOwnMetadata(METADATA_KEYS.HANDLER, Mock);

        expect(metadataList).to.have.lengthOf(1);
        expect(metadataList[0].path).to.equal(path);
        expect(metadataList[0].httpMethod).to.equal("put");
        expect(metadataList[0].methodName).to.equal("Handler");
    });

    it("should throw error when path is not a string", () => {

        const fn = () => {

            class Mock {

                @Put(undefined)
                public Handler() { }
            }
        };

        expect(fn).to.throws(`An error occurred annotating Mock.Handler(...) as 'put' handler. Error: Path cannot be empty`);
    });

    it("should throw error when method annotated more than once", () => {

        const path = faker.random.word();

        const fn = () => {

            class Mock {

                @Put(path)
                @Put(path)
                public Handler() { }
            }
        };

        expect(fn).to.throws(`An error occurred annotating Mock.Handler(...) as 'put' handler. Error: Class Mock.Handler(...) already annotated as handler`);
    });
});
