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
    }

    public async searchBookData(bookEntries: BookEntity[]) {
        const completeBooksData: BookEntity[] = new Array<BookEntity>();
        console.log("Searching book data");
        for (const book of bookEntries) {
            const requestFormattedTitle = this.getFormattedTitle(book);
            const options = {
                uri: "http://openlibrary.org/search.json?q=" + requestFormattedTitle,
                headers: {
                    "User-Agent": "Request-Promise"
                },
                json: true // Automatically parses the JSON string in the response
            };
            try {
                const resp = await rp(options);
                if (resp.statusCode !== 400) {
                    const completeBook = this.parseJsonIntoBook(resp, book);
                    await this.bookDbManager.insert(completeBook);
                }
            } catch (error) {
                console.log(error.message);
            }
        }
    }

    private parseJsonIntoBook(json: any, book: BookEntity) {
        if (json && json.numFound > 0) {
            if (json.docs[0].first_publish_year) {
                book.firstPublishYear = json.docs[0].first_publish_year;
            }
            if (json.docs[0].isbn) {
                book.ISBN = json.docs[0].isbn;
            }
            if (json.docs[0].subject) {
                book.subject.push(json.docs[0].subject);
            }
            if (json.docs[0].cover_i) {
                book.coverDir = json.docs[0].cover_i;
            }

        }
        return book;
    }

    private getFormattedTitle(book: BookEntity) {
        let requestFormattedTitle = book.title.trim();
        requestFormattedTitle = requestFormattedTitle.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        requestFormattedTitle = requestFormattedTitle.split(" ").join("+");
        console.log(requestFormattedTitle);
        return requestFormattedTitle;
    }


}