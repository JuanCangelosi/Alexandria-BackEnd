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
const typeorm_1 = require("typeorm");
const BookEntity_1 = require("../entity/BookEntity");
const BookDbManager_1 = require("../entityDbManagement/BookDbManager");
const inversify_1 = require("inversify");
const inversify_express_utils_1 = require("inversify-express-utils");
let BookController = class BookController {
    getBooks(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // get a post repository to perform operations with post
            const postRepository = typeorm_1.getManager().getRepository(BookEntity_1.BookEntity);
            // load a post by a given post id
            const posts = yield postRepository.find();
            // return loaded posts
            response.send(posts);
        });
    }
};
__decorate([
    inversify_1.inject("IEntityDbManager"),
    __metadata("design:type", BookDbManager_1.BookDbManager)
], BookController.prototype, "bookDbManager", void 0);
__decorate([
    inversify_express_utils_1.httpGet("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "getBooks", null);
BookController = __decorate([
    inversify_express_utils_1.controller("/testBook")
], BookController);
exports.BookController = BookController;
//# sourceMappingURL=BookController.js.map