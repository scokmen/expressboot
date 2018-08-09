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

    @Get("/demo1")
    public getJson(@FromHeader("user-agent") userAgent: string): IHttpResult {
        return new JsonResult(201, {userAgent});
    }

    @Get("/demo2")
    public getString(@FromHeader("user-agent") userAgent: string): IHttpResult {
        return new StringResult(201, userAgent);
    }
}

class ProductServer extends Server {
    constructor() {
        super("product-api", 3000);
    }
}


new ProductServer().start();
