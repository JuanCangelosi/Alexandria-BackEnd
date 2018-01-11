"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
const cheerio = require("cheerio");
// import * as url from "url-parse";
const fs = require("fs");
class GutenbergCrawler {
    constructor() {
        this.start_url = "mypage.com";
        this.search_word = "Hola";
        this.max_pages_to_visit = 100;
        this.pagesVisited = new Map();
        // pagesVisited: boolean[] = new Array<boolean>();
        this.numPagesVisited = 0;
        this.pagesToVisit = new Array();
        this.url = new URL(this.start_url);
        this.baseUrl = this.url.protocol + "//" + this.url.hostname;
        this.pagesToVisit.push(this.start_url);
        this.start();
    }
    start() {
        if (this.numPagesVisited >= this.max_pages_to_visit) {
            console.log("Reached max limit of number of pages to visit.");
            return;
        }
        const nextPage = this.pagesToVisit.pop();
        if (this.pagesVisited.get(nextPage)) {
            // We've already visited this page, so repeat the crawl
            this.start();
        }
        else {
            // New page we haven't visited
            this.visitPage(nextPage, this.start);
        }
    }
    visitPage(url, callback) {
        // Add page to our set
        this.pagesVisited.set(url, true);
        this.numPagesVisited++;
        // Make the request
        console.log("Visiting page " + url);
        request(url, function (error, response, body) {
            // Check status code (200 is HTTP OK)
            console.log("Status code: " + response.statusCode);
            if (response.statusCode !== 200) {
                callback();
                return;
            }
            // Parse the document body
            const $ = cheerio.load(body);
            const isWordFound = this.searchForWord($, this.search_word);
            if (isWordFound) {
                console.log("Word " + this.search_word + " found at page " + url);
                this.createEntry($);
                this.collectDownloads($, url);
                callback();
            }
            else {
                this.collectInternalLinks($);
                // In this short program, our callback is just calling crawl()
                callback();
            }
        });
    }
    searchForWord($, word) {
        const bodyText = $("html > body").text().toLowerCase();
        return (bodyText.indexOf(word.toLowerCase()) !== -1);
    }
    collectInternalLinks($) {
        const relativeLinks = $("a[href^='/']");
        console.log("Found " + relativeLinks.length + " relative links on page");
        relativeLinks.each(function () {
            this.pagesToVisit.push(this.baseUrl + $(this).attr("href"));
        });
    }
    collectDownloads($, url) {
        // Necesito buscar en el dom, dentro del form book que numero de opcion elegí
        const option = $('option[value*="pdf:"]').attr("value").charAt(0);
        const auxLink = url.replace("http://manybooks.net/titles/", "http://manybooks.net/download-ebook?tid=");
        const downloadLink = auxLink.replace(".html", "&book=" + option + "%3Apdf%3A.pdf%3Apdf");
        const title = $('h1[class*="booktitle"]').text();
        // Add page to our set
        this.pagesVisited.set(url, true);
        this.numPagesVisited++;
        this.visitDownload(downloadLink, title);
    }
    visitDownload(url, title) {
        console.log("Visiting Download page " + url);
        request(url, function (error, response, body) {
            // Check status code (200 is HTTP OK)
            console.log("Status code: " + response.statusCode);
            if (response.statusCode !== 200) {
                this.callback();
                return;
            }
            // Parse the document body
            const $ = cheerio.load(body);
            console.log($('a[href*=".pdf"]').attr("href"));
            this.download($('a[href*=".pdf"]').attr("href"), title);
        });
    }
    download(url, title) {
        if (url.indexOf("/send/") !== -1) {
            request("http://manybooks.net" + url, function (error, response, body) {
                console.log("Status code: " + response.statusCode);
                // console.log(response);
                // console.log(body);
            }).pipe(fs.createWriteStream("./books/" + title + ".pdf"));
        }
        else {
            request(url, function (error, response, body) {
                console.log("Status code: " + response.statusCode);
                // console.log(response);
                // console.log(body);
            }).pipe(fs.createWriteStream("./books/" + title + ".pdf"));
        }
    }
    createEntry($, title) {
        // const title = $('h1[class*="booktitle"]').text();
        const author = $('span:contains("Author: ")+ a').text();
        const language = $('span:contains("Language: ")+ a').text();
        const year = $('span:contains("Published: ")').text();
        // var i=0;
        /*var genres = [];
         $('span:contains("Genres: ")').siblings().each(function () {
            genres[i] = $(this).text();
            i++;
        });
        */
        console.log(title);
        console.log(author);
        console.log(language);
        // console.log(genres);
    }
}
exports.GutenbergCrawler = GutenbergCrawler;
//# sourceMappingURL=gutemberg-crawler.js.map