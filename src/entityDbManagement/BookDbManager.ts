import { IEntityDbManager } from "./IEntityDbManager";
import { injectable, inject } from "inversify";
import { IDbConnection } from "../dbConnection/IDbConnection";
import { BookEntity } from "../entity/BookEntity";


@injectable()
export class BookDbManager implements IEntityDbManager {

    private _dbConnection: IDbConnection;

    constructor( @inject("IDbConnection") dbConnection: IDbConnection) {
        this._dbConnection = dbConnection;
        console.log("Creado");
        console.log(this._dbConnection);
    }

    public async get(index: number) {
       const manager = await this._dbConnection.getEntityManager();
       // manager.find<BookEntity>()
       return new Promise<BookEntity>(() => {});
    }

    public async getAll() {
        const manager = await this._dbConnection.getEntityManager();
        return <Promise<BookEntity[]>> manager.find("BookEntity");
    }

    public async insert(entity: BookEntity) {
        const manager = await this._dbConnection.getEntityManager();
        console.log("saving file");
        const savedEnt = await manager.save(entity);
        console.log(savedEnt);
    }

    public async delete(index: number) {

    }

    public async update(entity: BookEntity) {

    }
}
