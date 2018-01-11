import { IWebCrawler } from "./IWebCrawler";
import * as request from "request";
import * as cheerio from "cheerio";
// import * as url from "url-parse";
import * as fs from "fs";
import { error } from "util";
import { reject } from "async";
import * as rp from "request-promise";

export class GutenbergCrawler implements IWebCrawler {

    start_url = "http://www.gutenberg.org/robot/harvest?filetypes[]=html&langs[]=es";
    // search_word = "Hola";

    max_pages_to_visit = 10;

    pagesVisited: Map<string, boolean> = new Map<string, boolean>();
    // pagesVisited: boolean[] = new Array<boolean>();
    numPagesVisited = 0;
    pagesToVisit: string[] = new Array<string>();

    // url = new URL(this.start_url);
    // baseUrl = url.protocol + "//" + url.hostname;

    constructor() {
        console.log("Constructor del crawler");
        this.pagesToVisit.push(this.start_url);
        // this.start();
    }

    public async start() {
        if (this.numPagesVisited >= this.max_pages_to_visit) {
            console.log("Reached max limit of number of pages to visit.");
            return;
        }
        const nextPage = this.pagesToVisit.pop();
        if (this.pagesVisited.get(nextPage)) {
            // We've already visited this page, so repeat the crawl
            await this.start();
        } else {
            // New page we haven't visited
            await this.visitPage(nextPage, this.start);
        }
    }

    private async visitPage(url: string, callback: () => any): Promise<void> {
        // Add page to our set
        this.pagesVisited.set(url, true);
        this.numPagesVisited++;
        // Make the request
        // let requestPromise: Promise<void>;
        console.log("Visiting page " + url);
        request(url, async (error, response, body) => {
            // Check status code (200 is HTTP OK)
            console.log("Status code: " + response.statusCode);
            if (response.statusCode !== 200) {
                callback();
                return;
            }
            // Parse the document body
            const $ = cheerio.load(body);
            await this.collectInternalLinks($);
        });
        // await requestPromise;
        return;
    }

    private async collectInternalLinks($: CheerioStatic): Promise<void> {
        const relativeLinks: Cheerio = $("a[href]");
        // console.log(relativeLinks);
        // let i = 0;
        console.log("Found " + relativeLinks.length + " relative links on page");

        const myPromises: Promise<void> [] = new Array<Promise<void>>();

        relativeLinks.each((index: number, element: CheerioElement) => {
            // console.log(element.attribs.href);
            // i++;
            if (element.attribs.href.includes(".zip")) {
                // myPromises.push(this.downloadLink(element.attribs.href, i));
                console.log("Downloading: " + index + ".zip");
                myPromises.push(this.downloadLink(element.attribs.href, index));
            } else {
                console.log("visit another page with: " + element.attribs.href);
                // this.pagesToVisit.push(element.attribs[0]);
            }
        });
        await Promise.all(myPromises);
        console.log("Finished scrapping!!!");
        return;
    }

    private async downloadLink(link: string, name: number): Promise<void> {
        const promise = new Promise<void>((resolve, reject) => {
            console.log("Starting Download: " + link);
            const stream = rp(link, function (err, resp, body) {
                if (err) throw err;
            });
            const wstream = stream.pipe(fs.createWriteStream("./zips/h" + name + ".zip"));

            wstream.on("close", () => {
                console.log(name + "File written!");
                resolve();
            });
        });
        return promise;
    }

}