import { Request, Response, NextFunction } from "express";
import { BookEntity } from "../entity/BookEntity";
import { BookDbManager } from "../entityDbManagement/BookDbManager";
import { inject } from "inversify";
import { controller, httpGet, interfaces } from "inversify-express-utils";
import * as path from "path";
import { race } from "bluebird";
import * as fs from "fs";

@controller("/testBook")
export class BookController implements interfaces.Controller {
    @inject("BookDbManager") private bookDbManager: BookDbManager;

    @httpGet("/")
    public async getBooks(request: Request, response: Response, next: NextFunction) {

        // get a post repository to perform operations with post
        const posts = await this.bookDbManager.getAll();

        // return loaded posts
        response.send(posts);
    }

    @httpGet("/newBooks")
    public async getNewBooks(request: Request, response: Response, next: NextFunction) {

        // load a post by a given post id
        const posts = await this.bookDbManager.getNewerBooks();

        // return loaded posts
        response.send(posts);
    }

    @httpGet("/book.epub")
    public async getBook(request: Request, response: Response, next: NextFunction) {
        // response.end(path.resolve("src/bookFiles/moby-dick.epub"));
        const file = fs.createReadStream("src/bookFiles/moby-dick.epub");
        const stat = fs.statSync("src/bookFiles/moby-dick.epub");
        response.setHeader("Content-Length", stat.size);
        response.setHeader("Content-Type", "text/plain");
        response.setHeader("Accept-Ranges", "bytes");
        file.pipe(response);
    }



}