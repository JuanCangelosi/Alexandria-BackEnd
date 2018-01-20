import { Request, Response, NextFunction } from "express";
import { getManager } from "typeorm";
import { BookEntity } from "../entity/BookEntity";
import { BookDbManager } from "../entityDbManagement/BookDbManager";
import { inject } from "inversify";
import { controller, httpGet, interfaces } from "inversify-express-utils";

@controller("/testBook")
export class BookController implements interfaces.Controller {
    @inject("BookDbManager") private bookDbManager: BookDbManager;

    @httpGet("/")
    public async getBooks(request: Request, response: Response, next: NextFunction) {

        // get a post repository to perform operations with post
        const postRepository = getManager().getRepository(BookEntity);

        // load a post by a given post id
        const posts = await postRepository.find();

        // return loaded posts
        response.send(posts);
    }
}