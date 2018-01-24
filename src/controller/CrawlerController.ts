import { inject } from "inversify";
import { controller, httpGet, interfaces } from "inversify-express-utils";
import { NextFunction, Request, Response } from "express";
import { BookDbManager } from "../entityDbManagement/BookDbManager";
import { GutDataRetrieval } from "../crawl/data-retrieval/gut-data-retrieval";
import { MongoDbConnection } from "../dbConnection/mongoDbConnection";
import { GutenbergCrawler } from "../crawl/webCrawler/test-crawler";
import { GutenbergUnzipper } from "../crawl/unzip/gutenberg-unzipper";
import { EbookParser } from "../crawl/parser/ebookParser";

@controller("/crawl")
export class CrawlerController implements interfaces.Controller {

    // @inject("BookDbManager") private bookDbManager: BookDbManager;

    @inject("GutDataRetrieval") private gutembergRetrieval: GutDataRetrieval;
    @inject("GutenbergCrawler") private gutenbergCrawler: GutenbergCrawler;
    @inject("GutenbergUnzipper") private gutenbergUnzipper: GutenbergUnzipper;
    @inject("EbookParser") private ebookParser: EbookParser;

    constructor() {
    }

    @httpGet("/get")
    public async getBooks(req: Request, res: Response, next: NextFunction) {
        console.log("getting books");
        await this.gutenbergCrawler.start();
    }
    @httpGet("/parse")
    public async parse(req: Request, res: Response, next: NextFunction) {
        console.log("parsing books");
        const books = await this.ebookParser.parse();
        await this.gutembergRetrieval.searchBookData(books);
    }

    @httpGet("/unzip")
    public async getBooksUnzipped (req: Request, res: Response, next: NextFunction) {
        // const unzipper: GutenbergUnzipper = new GutenbergUnzipper();
        console.log("unzipping books");
        this.gutenbergUnzipper.unzip();
    }
}