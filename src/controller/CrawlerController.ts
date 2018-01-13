import { inject } from "inversify";
import { controller, httpGet, interfaces } from "inversify-express-utils";
import { NextFunction, Request, Response } from "express";
import { BookDbManager } from "../entityDbManagement/BookDbManager";
import { GutDataRetrieval } from "../crawl/data-retrieval/gut-data-retrieval";
import { MongoDbConnection } from "../dbConnection/mongoDbConnection";

@controller("/crawl")
export class CrawlerController implements interfaces.Controller {

    // @inject("IEntityDbManager") private bookDbManager: BookDbManager;

    @inject("GutDataRetrieval") private gutembergRetrieval: GutDataRetrieval;

    constructor() {
    }

    @httpGet("/get")
    public async getBooks(req: Request, res: Response, next: NextFunction) {
        // const crawler: GutenbergCrawler = new GutenbergCrawler();
        console.log("getting books");
        // console.log(this.bookDbManager);
        // crawler.start();
    }

    @httpGet("/unzip")
    public async getBooksUnzipped (req: Request, res: Response, next: NextFunction) {
        // const unzipper: GutenbergUnzipper = new GutenbergUnzipper();
        console.log("unzipping books");
        // unzipper.unzip();
    }

    @httpGet("/catalog")
    public async catalogBooks (req: Request, res: Response, next: NextFunction) {
        // const cataloger: GutenbergCataloger = new GutenbergCataloger();
        console.log("cataloging books");
        await this.gutembergRetrieval.retrieve("./src/unzips");
        // console.log("Finished cataloging");
        // console.log(cataloger.bookEntries);
       // const booksData: BookEntryData[] = await cataloger.searchBookData();
       // await this.gutembergRetrieval.searchBookData();
    }

}