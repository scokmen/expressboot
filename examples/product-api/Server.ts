import {
    BaseController,
    Controller,
    FromHeader,
    FromRoute,
    FromQuery,
    Get,
    Server
} from "../../src/ExpressBoot";

@Controller("products")
class ProductController extends BaseController {

    public constructor() {
        super();
    }

    @Get("/:id")
    public getProduct(@FromRoute("id") id: string, @FromQuery("sort") sort: string, @FromHeader("user-agent") userAgent: string): any {
        return {
            "id": id,
            "sort": sort,
            "user-agent": userAgent
        };
    }
}

class ProductServer extends Server {
    constructor() {
        super("product-api", 3000);
    }
}


new ProductServer().start();
