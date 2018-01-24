import * as fs from "fs";
import * as fsExtra from "fs-extra";
import * as rp from "request-promise";
import { error } from "util";
import { reject } from "async";
import { BookEntity } from "../../entity/BookEntity";
import { BookDbManager } from "../../entityDbManagement/BookDbManager";
import { inject, injectable } from "inversify";
import * as path from "path";

@injectable()
export class GutDataRetrieval {


    constructor( @inject("BookDbManager") private bookDbManager: BookDbManager) {
        console.log(this.bookDbManager);
    }

    public async searchBookData(bookEntries: BookEntity[]) {
        const completeBooksData: BookEntity[] = new Array<BookEntity>();
        console.log("Searching book data");
        // console.log(this.bookEntries);
        console.log(bookEntries.length);
        for (const book of bookEntries) {
            if (book.title !== "" && book.title !== " ") {
                let requestFormattedTitle = book.title.trim();
                requestFormattedTitle = requestFormattedTitle.split(" ").join("+");
                console.log(requestFormattedTitle);
                const options = {
                    uri: "http://openlibrary.org/search.json?q=" + requestFormattedTitle,
                    headers: {
                        "User-Agent": "Request-Promise"
                    },
                    json: true // Automatically parses the JSON string in the response
                };
                try {
                    const resp = await rp(options);
                    if (resp.statusMessage !== "Bad request") {
                        const completeBook = this.parseJsonIntoBook(resp, book);
                        await this.bookDbManager.insert(completeBook);
                    }
                } catch (error) {
                }
            }
        }
    }

    private parseJsonIntoBook(json: any, book: BookEntity) {
        console.log(json);
        return book;
    }


}