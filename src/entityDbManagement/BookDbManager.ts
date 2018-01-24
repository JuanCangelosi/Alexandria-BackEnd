import { IEntityDbManager } from "./IEntityDbManager";
import { injectable, inject } from "inversify";
import { IDbConnection } from "../dbConnection/IDbConnection";
import { BookEntity } from "../entity/BookEntity";
import { AuthorDbManager } from "./AuthorDbManager";
import { BasicAuthorEntity } from "../entity/BasicAuthorEntity";
import { AuthorEntity } from "../entity/AuthorEntity";


@injectable()
export class BookDbManager implements IEntityDbManager {

    @inject("IDbConnection") private _dbConnection: IDbConnection;
    @inject("AuthorDbManager") private _authorDbManager: AuthorDbManager;

    constructor() {
    }

    public async get(index: number) {
        const manager = await this._dbConnection.getEntityManager();
        const book: BookEntity = await manager.findOneById<BookEntity>("BookEntity", index);
        return book;
    }

    public async getAll() {
        const manager = await this._dbConnection.getEntityManager();
        const books: BookEntity[] = await manager.find<BookEntity>("BookEntity");
        return books;
    }

    public async insert(entity: BookEntity) {
        const manager = await this._dbConnection.getEntityManager();
        const author = await this._authorDbManager.getByName(entity.author.name);
        if (author && author.length > 0 && author[0].id !== 0) {
            this.setBasicAuthorData(entity.author, author[0]);
        } else {
            const newAuthor: AuthorEntity = this.createNewAuthor(entity.author);
            const completeAuthor = await this._authorDbManager.insert(newAuthor);
            this.setBasicAuthorData(entity.author, completeAuthor);
        }
        const savedEnt = await manager.save<BookEntity>(entity);
        return savedEnt;
    }

    public async delete(index: number) {
        const manager = await this._dbConnection.getEntityManager();
        const savedEnt = await manager.deleteById<BookEntity>("BookEntity", index);
        return savedEnt;
    }

    public async update(entity: BookEntity) {
        const manager = await this._dbConnection.getEntityManager();
        const savedEnt = await manager.save<BookEntity>(entity);
        return savedEnt;
    }

    public async getNewerBooks() {
        const manager = await this._dbConnection.getEntityManager();
        const newestBooks = await manager.find("BookEntity", {
            order: {
                "addDate": "DESC",
            },
            take: 10
        });
        return newestBooks;
    }

    private setBasicAuthorData(basicAuthor: BasicAuthorEntity, completeAuthor: AuthorEntity) {
        basicAuthor.id = completeAuthor.id;
        basicAuthor.name = completeAuthor.name;
        basicAuthor.birthYear = completeAuthor.birthYear;
        basicAuthor.alsoKnowAs = completeAuthor.alsoKnowAs;
    }

    private createNewAuthor(basicAuthor: BasicAuthorEntity): AuthorEntity {
        const newAuthor = new AuthorEntity();
        newAuthor.name = basicAuthor.name;
        newAuthor.birthYear = basicAuthor.birthYear;
        newAuthor.alsoKnowAs = basicAuthor.alsoKnowAs;
        return newAuthor;
    }
}
