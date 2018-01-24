import { injectable } from "inversify";
import * as fs from "fs";
import * as Admzip from "adm-zip";
import { BookEntity } from "../../entity/BookEntity";
const Epub = require("epub");

@injectable()
export class EbookParser {

    constructor() {

    }

    public async parse(): Promise<BookEntity[]> {
        const books = new Array<BookEntity>();
        const zips: string[] = fs.readdirSync("src/epubs");
        for (const zip of zips) {
            console.log(zip);
            await new Promise((resolve, reject) => {
                const epub = new Epub("src/epubs/" + zip);
                epub.on("end", () => {
                    const book: BookEntity = new BookEntity();
                    book.author.name = epub.metadata.creator;
                    book.author.alsoKnowAs = [epub.metadata.creatorFileAs];
                    book.title = epub.metadata.title;
                    book.language = epub.metadata.language;
                    book.firstPublishYear = epub.metadata.date;
                    book.subject = Array<string>();
                    book.subject.push(epub.metadata.subject);
                    book.fileDir = zip;
                    books.push(book);
                    resolve();
                });
                epub.parse();
            });
        }
        return books;
    }

}