import "reflect-metadata";
import { createConnection } from "typeorm";
import { Request, Response } from "express";
import * as express from "express";
import * as bodyParser from "body-parser";
import { Container } from "inversify";
import { IDbConnection } from "./dbConnection/IDbConnection";
import { MongoDbConnection } from "./dbConnection/mongoDbConnection";
import { interfaces, InversifyExpressServer, TYPE } from "inversify-express-utils";
import { BookDbManager } from "./entityDbManagement/BookDbManager";
import { IEntityDbManager } from "./entityDbManagement/IEntityDbManager";
import { UserDbManager } from "./entityDbManagement/UserDbManager";

// Controller Imports
import "./controller/BookController";
import "./controller/CrawlerController";
import "./controller/LoginController";
import "./controller/RegisterController";
import { GutDataRetrieval } from "./crawl/data-retrieval/gut-data-retrieval";

// Authentication Middleware
import { authenticationMiddleware } from "./authentication.middleware";
import { GutenbergCrawler } from "./crawl/webCrawler/test-crawler";
import { GutenbergUnzipper } from "./crawl/unzip/gutenberg-unzipper";
import { EbookParser } from "./crawl/parser/ebookParser";


// connection settings are in the "ormconfig.json" file
createConnection().then(async connection => {

    const container = new Container();
    container.bind<IDbConnection>("IDbConnection").to(MongoDbConnection);
    container.bind<IEntityDbManager>("BookDbManager").to(BookDbManager);
    container.bind<IEntityDbManager>("UserDbManager").to(UserDbManager);
    container.bind<GutDataRetrieval>("GutDataRetrieval").to(GutDataRetrieval);
    container.bind<GutenbergCrawler>("GutenbergCrawler").to(GutenbergCrawler);
    container.bind<GutenbergUnzipper>("GutenbergUnzipper").to(GutenbergUnzipper);
    container.bind<EbookParser>("EbookParser").to(EbookParser);
    container.bind<express.RequestHandler>("AuthenticationMiddleware").toConstantValue(authenticationMiddleware);
    // create express app
    const server = new InversifyExpressServer(container);
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

}).catch(error => console.log("Error: ", error));