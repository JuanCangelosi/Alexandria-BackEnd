import { IEntityDbManager } from "./IEntityDbManager";
import { injectable, inject } from "inversify";
import { IDbConnection } from "../dbConnection/IDbConnection";
import { AuthorEntity } from "../entity/AuthorEntity";


@injectable()
export class AuthorDbManager implements IEntityDbManager {

    private _dbConnection: IDbConnection;

    constructor( @inject("IDbConnection") dbConnection: IDbConnection) {
        this._dbConnection = dbConnection;
    }

    public async get(index: number) {
        const manager = await this._dbConnection.getEntityManager();
        const author: AuthorEntity = await manager.findOneById<AuthorEntity>("AuthorEntity", index);
        return author;
    }

    public async getAll() {
        const manager = await this._dbConnection.getEntityManager();
        const authors: AuthorEntity[] = await manager.find<AuthorEntity>("AuthorEntity");
        return authors;
    }

    public async insert(entity: AuthorEntity) {
        const manager = await this._dbConnection.getEntityManager();
        const savedEnt = await manager.save<AuthorEntity>(entity);
        return savedEnt;
    }

    public async delete(index: number) {
        const manager = await this._dbConnection.getEntityManager();
        const savedEnt = await manager.deleteById<AuthorEntity>("AuthorEntity", index);
        return savedEnt;
    }

    public async update(entity: AuthorEntity) {
        const manager = await this._dbConnection.getEntityManager();
        const savedEnt = await manager.save<AuthorEntity>(entity);
        return savedEnt;
    }

    public async getByName(nameToSearch: string) {
        const manager = await this._dbConnection.getEntityManager();
        const authors: AuthorEntity[] = await manager.find<AuthorEntity>("AuthorEntity", {name: nameToSearch});
        return authors;
    }
}