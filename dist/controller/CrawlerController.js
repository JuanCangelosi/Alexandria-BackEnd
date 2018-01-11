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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const inversify_express_utils_1 = require("inversify-express-utils");
const gut_data_retrieval_1 = require("../crawl/data-retrieval/gut-data-retrieval");
let CrawlerController = class CrawlerController {
    constructor() {
    }
    getBooks(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // const crawler: GutenbergCrawler = new GutenbergCrawler();
            console.log("getting books");
            // console.log(this.bookDbManager);
            // crawler.start();
        });
    }
    getBooksUnzipped(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // const unzipper: GutenbergUnzipper = new GutenbergUnzipper();
            console.log("unzipping books");
            // unzipper.unzip();
        });
    }
    catalogBooks(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // const cataloger: GutenbergCataloger = new GutenbergCataloger();
            console.log("cataloging books");
            yield this.gutembergRetrieval.retrieve("./src/unzips");
            // console.log("Finished cataloging");
            // console.log(cataloger.bookEntries);
            // const booksData: BookEntryData[] = await cataloger.searchBookData();
            yield this.gutembergRetrieval.searchBookData();
        });
    }
};
__decorate([
    inversify_1.inject("GutDataRetrieval"),
    __metadata("design:type", gut_data_retrieval_1.GutDataRetrieval)
], CrawlerController.prototype, "gutembergRetrieval", void 0);
__decorate([
    inversify_express_utils_1.httpGet("/get"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], CrawlerController.prototype, "getBooks", null);
__decorate([
    inversify_express_utils_1.httpGet("/unzip"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], CrawlerController.prototype, "getBooksUnzipped", null);
__decorate([
    inversify_express_utils_1.httpGet("/catalog"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], CrawlerController.prototype, "catalogBooks", null);
CrawlerController = __decorate([
    inversify_express_utils_1.controller("/crawl"),
    __metadata("design:paramtypes", [])
], CrawlerController);
exports.CrawlerController = CrawlerController;
//# sourceMappingURL=CrawlerController.js.map