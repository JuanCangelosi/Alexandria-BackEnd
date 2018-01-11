"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
const cheerio = require("cheerio");
// import * as url from "url-parse";
const fs = require("fs");
const rp = require("request-promise");
class GutenbergCrawler {
    // url = new URL(this.start_url);
    // baseUrl = url.protocol + "//" + url.hostname;
    constructor() {
        this.start_url = "http://www.gutenberg.org/robot/harvest?filetypes[]=html&langs[]=es";
        // search_word = "Hola";
        this.max_pages_to_visit = 10;
        this.pagesVisited = new Map();
        // pagesVisited: boolean[] = new Array<boolean>();
        this.numPagesVisited = 0;
        this.pagesToVisit = new Array();
        console.log("Constructor del crawler");
        this.pagesToVisit.push(this.start_url);
        // this.start();
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.numPagesVisited >= this.max_pages_to_visit) {
                console.log("Reached max limit of number of pages to visit.");
                return;
            }
            const nextPage = this.pagesToVisit.pop();
            if (this.pagesVisited.get(nextPage)) {
                // We've already visited this page, so repeat the crawl
                yield this.start();
            }
            else {
                // New page we haven't visited
                yield this.visitPage(nextPage, this.start);
            }
        });
    }
    visitPage(url, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            // Add page to our set
            this.pagesVisited.set(url, true);
            this.numPagesVisited++;
            // Make the request
            // let requestPromise: Promise<void>;
            console.log("Visiting page " + url);
            request(url, (error, response, body) => __awaiter(this, void 0, void 0, function* () {
                // Check status code (200 is HTTP OK)
                console.log("Status code: " + response.statusCode);
                if (response.statusCode !== 200) {
                    callback();
                    return;
                }
                // Parse the document body
                const $ = cheerio.load(body);
                yield this.collectInternalLinks($);
            }));
            // await requestPromise;
            return;
        });
    }
    collectInternalLinks($) {
        return __awaiter(this, void 0, void 0, function* () {
            const relativeLinks = $("a[href]");
            // console.log(relativeLinks);
            // let i = 0;
            console.log("Found " + relativeLinks.length + " relative links on page");
            const myPromises = new Array();
            relativeLinks.each((index, element) => {
                // console.log(element.attribs.href);
                // i++;
                if (element.attribs.href.includes(".zip")) {
                    // myPromises.push(this.downloadLink(element.attribs.href, i));
                    console.log("Downloading: " + index + ".zip");
                    myPromises.push(this.downloadLink(element.attribs.href, index));
                }
                else {
                    console.log("visit another page with: " + element.attribs.href);
                    // this.pagesToVisit.push(element.attribs[0]);
                }
            });
            yield Promise.all(myPromises);
            console.log("Finished scrapping!!!");
            return;
        });
    }
    downloadLink(link, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const promise = new Promise((resolve, reject) => {
                console.log("Starting Download: " + link);
                const stream = rp(link, function (err, resp, body) {
                    if (err)
                        throw err;
                });
                const wstream = stream.pipe(fs.createWriteStream("./zips/h" + name + ".zip"));
                wstream.on("close", () => {
                    console.log(name + "File written!");
                    resolve();
                });
            });
            return promise;
        });
    }
}
exports.GutenbergCrawler = GutenbergCrawler;
//# sourceMappingURL=test-crawler.js.map