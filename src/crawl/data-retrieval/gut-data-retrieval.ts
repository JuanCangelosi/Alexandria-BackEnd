import * as fs from "fs";
import * as rp from "request-promise";
import { error } from "util";
import { reject } from "async";
import { BookEntity } from "../../entity/BookEntity";
import { BookDbManager } from "../../entityDbManagement/BookDbManager";
import { inject, injectable } from "inversify";
import * as path from "path";

@injectable()
export class GutDataRetrieval {

    public bookEntries: Array<BookEntity>;


    constructor(  @inject("IEntityDbManager") private bookDbManager: BookDbManager) {
        console.log(this.bookDbManager);
    }

    public async retrieve(dir: string) {
        this.bookDbManager.get(0);
        this.bookEntries = new Array<BookEntity>();
        this.searchBooksToRetrieveData(dir);
        // await this.searchBookData();
        console.log("searching ended");
    }

    private searchBooksToRetrieveData(dir: string) {
        const files: string[] = fs.readdirSync(dir);
        for (const file of files) {
            const stat = fs.statSync(dir + "/" + file);
            if (stat.isDirectory()) {
                this.searchBooksToRetrieveData(dir + "/" + file);
            } else {
                if (file.includes(".htm")) {
                    this.readFile(dir + "/" + file);
                }
            }
        }
    }

    private readFile(file: string) {
        const buffer: string = fs.readFileSync(file, "utf-8");
        this.createEntry(buffer, file);
    }

    private createEntry(buffer: string, file: string) {
        // Crear un nuevo objeto a esta altura
        const bookEntry: BookEntity = new BookEntity();
        bookEntry.title = this.getDataFromFile(buffer, "Title: ");
        bookEntry.author.name = this.getDataFromFile(buffer, "Author: ");
        bookEntry.fileDir = file.substr(file.lastIndexOf("/") + 1);
        console.log("Pushing entry: " + bookEntry.title);
        this.bookEntries.push(bookEntry);
    }

    private getDataFromFile(buffer: string, searchField: string): string {
        const index: number = buffer.indexOf(searchField);
        const endIndex: number = buffer.indexOf("\r", index);
        let search = "";
        if (index > 0 && endIndex > 0) {
            search = buffer.slice(index, endIndex);
            search = search.substring(searchField.length);
            if (search.indexOf("<") > -1) {
                search = search.slice(index, search.indexOf("<"));
            }
            console.log(search);
        } else {
            console.log("search not found");
        }
        return search;
    }

    public async searchBookData() {
        const completeBooksData: BookEntity[] = new Array<BookEntity>();
        console.log("Searching book data");
        // console.log(this.bookEntries);
        console.log(this.bookEntries.length);
        for (const book of this.bookEntries) {
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
                    console.log(error);
                }
            }
        }
    }

    private parseJsonIntoBook(json: any, book: BookEntity) {
        if (json.numFound > 0) {
            const firstResult = json.docs[0];
            book.title = firstResult.title_suggest;
            book.coverDir = firstResult.cover_i;
            book.author = firstResult.author_name;
            book.firstPublishYear = firstResult.first_publish_year;
            book.ISBN = firstResult.isbn;
            book.language = firstResult.language;
        }
        return book;
    }


}