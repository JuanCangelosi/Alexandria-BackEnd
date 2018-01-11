"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const bodyParser = require("body-parser");
const inversify_1 = require("inversify");
const mongoDbConnection_1 = require("./dbConnection/mongoDbConnection");
const inversify_express_utils_1 = require("inversify-express-utils");
const BookDbManager_1 = require("./entityDbManagement/BookDbManager");
// Controller Imports
require("./controller/BookController");
require("./controller/CrawlerController");
const gut_data_retrieval_1 = require("./crawl/data-retrieval/gut-data-retrieval");
// connection settings are in the "ormconfig.json" file
typeorm_1.createConnection().then((connection) => __awaiter(this, void 0, void 0, function* () {
    const container = new inversify_1.Container();
    container.bind("IDbConnection").to(mongoDbConnection_1.MongoDbConnection);
    container.bind("IEntityDbManager").to(BookDbManager_1.BookDbManager);
    container.bind("GutDataRetrieval").to(gut_data_retrieval_1.GutDataRetrieval);
    // create express app
    const server = new inversify_express_utils_1.InversifyExpressServer(container);
    server.setConfig((app) => {
        app.use(bodyParser.json());
    });
    const app = server.build();
    // run app
    app.listen(3000);
    console.log("Express application is up and running on port 3000");
    /*
    const category1 = new Category();
    category1.name = "TypeScript";

    const category2 = new Category();
    category2.name = "Programming";

    const post = new Post();
    post.title = "Control flow based type analysis";
    post.text = `TypeScript 2.0 implements a control flow-based type analysis for local variables and parameters.`;
    post.categories = [category1, category2];

    await connection.mongoManager.save(post);
    console.log("Post has been saved: ", post);

    const loadedPosts = await connection.mongoManager.find(Post);
    console.log("Loaded posts from the database: ", loadedPosts);
     */
})).catch(error => console.log("Error: ", error));
//# sourceMappingURL=index.js.map