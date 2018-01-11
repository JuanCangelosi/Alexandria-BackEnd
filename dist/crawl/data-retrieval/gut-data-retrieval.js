"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const rp = require("request-promise");
const BookEntity_1 = require("../../entity/BookEntity");
const BookDbManager_1 = require("../../entityDbManagement/BookDbManager");
const inversify_1 = require("inversify");
let GutDataRetrieval = class GutDataRetrieval {
    constructor(bookDbManager) {
        this.bookDbManager = bookDbManager;
        console.log(this.bookDbManager);
    }
    retrieve(dir) {
        return __awaiter(this, void 0, void 0, function* () {
            this.bookDbManager.get(0);
            this.bookEntries = new Array();
            this.searchBooksToRetrieveData(dir);
            // await this.searchBookData();
            console.log("searching ended");
        });
    }
    searchBooksToRetrieveData(dir) {
        const files = fs.readdirSync(dir);
        for (const file of files) {
            const stat = fs.statSync(dir + "/" + file);
            if (stat.isDirectory()) {
                this.searchBooksToRetrieveData(dir + "/" + file);
            }
            else {
                if (file.includes(".htm")) {
                    this.readFile(dir + "/" + file);
                }
            }
        }
    }
    readFile(file) {
        const buffer = fs.readFileSync(file, "utf-8");
        this.createEntry(buffer, file);
    }
    createEntry(buffer, file) {
        // Crear un nuevo objeto a esta altura
        const bookEntry = new BookEntity_1.BookEntity();
        bookEntry.title = this.getDataFromFile(buffer, "Title: ");
        bookEntry.author.name = this.getDataFromFile(buffer, "Author: ");
        bookEntry.fileDir = file.substr(file.lastIndexOf("/") + 1);
        console.log("Pushing entry: " + bookEntry.title);
        this.bookEntries.push(bookEntry);
    }
    getDataFromFile(buffer, searchField) {
        const index = buffer.indexOf(searchField);
        const endIndex = buffer.indexOf("\r", index);
        let search = "";
        if (index > 0 && endIndex > 0) {
            search = buffer.slice(index, endIndex);
            search = search.substring(searchField.length);
            if (search.indexOf("<") > -1) {
                search = search.slice(index, search.indexOf("<"));
            }
            console.log(search);
        }
        else {
            console.log("search not found");
        }
        return search;
    }
    searchBookData() {
        return __awaiter(this, void 0, void 0, function* () {
            const completeBooksData = new Array();
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
                        const resp = yield rp(options);
                        if (resp.statusMessage !== "Bad request") {
                            const completeBook = this.parseJsonIntoBook(resp, book);
                            yield this.bookDbManager.insert(completeBook);
                        }
                    }
                    catch (error) {
                        console.log(error);
                    }
                }
            }
        });
    }
    parseJsonIntoBook(json, book) {
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
};
GutDataRetrieval = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject("IEntityDbManager")),
    __metadata("design:paramtypes", [BookDbManager_1.BookDbManager])
], GutDataRetrieval);
exports.GutDataRetrieval = GutDataRetrieval;
//# sourceMappingURL=gut-data-retrieval.js.map