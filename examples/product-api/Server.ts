import {
    BaseController,
    Controller,
    FromHeader,
    Get,
    Server,
    IHttpResult,
    StringResult,
    JsonResult
} from "../../src/ExpressBoot";

@Controller("products")
class ProductController extends BaseController {

    public constructor() {
        super();
    }

    @Get("/json")
    public json(@FromHeader("user-agent") userAgent: string): Object {
        return { userAgent };
    }

    @Get("/string")
    public string(@FromHeader("user-agent") userAgent: string): string {
        return userAgent;
    }

    @Get("/json-async")
    public async jsonAsync(@FromHeader("user-agent") userAgent: string): Promise<Object> {
        return await { userAgent };
    }

    @Get("/string-async")
    public async stringAsync(@FromHeader("user-agent") userAgent: string): Promise<string> {
        return await userAgent;
    }

    @Get("/json-result")
    public jsonResult(@FromHeader("user-agent") userAgent: string): IHttpResult {
        return new JsonResult(201, { userAgent });
    }

    @Get("/string-result")
    public stringResult(@FromHeader("user-agent") userAgent: string): IHttpResult {
        return new StringResult(201, userAgent);
    }

    @Get("/json-result-async")
    public async jsonResultAsync(@FromHeader("user-agent") userAgent: string): Promise<IHttpResult> {
        return await new JsonResult(201, { userAgent });
    }

    @Get("/string-result-async")
    public async stringResultAsync(@FromHeader("user-agent") userAgent: string): Promise<IHttpResult> {
        return await new StringResult(201, userAgent);
    }
}

class ProductServer extends Server {
    constructor() {
        super("product-api", 3000);
    }
}

new ProductServer().start();
