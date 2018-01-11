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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const AuthorEntity_1 = require("./AuthorEntity");
let BookEntity = class BookEntity {
    constructor() {
        this.author = new AuthorEntity_1.AuthorEntity();
    }
};
__decorate([
    typeorm_1.ObjectIdColumn(),
    __metadata("design:type", Number)
], BookEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BookEntity.prototype, "title", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BookEntity.prototype, "subtitle", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], BookEntity.prototype, "chapterAmount", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], BookEntity.prototype, "firstPublishYear", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BookEntity.prototype, "fileDir", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], BookEntity.prototype, "coverDir", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Array)
], BookEntity.prototype, "language", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Array)
], BookEntity.prototype, "ISBN", void 0);
__decorate([
    typeorm_1.Column(type => AuthorEntity_1.AuthorEntity),
    __metadata("design:type", AuthorEntity_1.AuthorEntity)
], BookEntity.prototype, "author", void 0);
BookEntity = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [])
], BookEntity);
exports.BookEntity = BookEntity;
//# sourceMappingURL=BookEntity.js.map