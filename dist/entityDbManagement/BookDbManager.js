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
const inversify_1 = require("inversify");
let BookDbManager = class BookDbManager {
    constructor(dbConnection) {
        this._dbConnection = dbConnection;
        console.log("Creado");
        console.log(this._dbConnection);
    }
    get(index) {
        return __awaiter(this, void 0, void 0, function* () {
            const manager = yield this._dbConnection.getEntityManager();
            // manager.find<BookEntity>()
            return new Promise(() => { });
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const manager = yield this._dbConnection.getEntityManager();
            return manager.find("BookEntity");
        });
    }
    insert(entity) {
        return __awaiter(this, void 0, void 0, function* () {
            const manager = yield this._dbConnection.getEntityManager();
            console.log("saving file");
            const savedEnt = yield manager.save(entity);
            console.log(savedEnt);
        });
    }
    delete(index) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    update(entity) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
};
BookDbManager = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject("IDbConnection")),
    __metadata("design:paramtypes", [Object])
], BookDbManager);
exports.BookDbManager = BookDbManager;
//# sourceMappingURL=BookDbManager.js.map