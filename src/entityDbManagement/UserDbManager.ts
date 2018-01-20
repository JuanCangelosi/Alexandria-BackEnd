import { IEntityDbManager } from "./IEntityDbManager";
import { injectable, inject } from "inversify";
import { IDbConnection } from "../dbConnection/IDbConnection";
import { UserEntity } from "../entity/UserEntity";


@injectable()
export class UserDbManager implements IEntityDbManager {

    private _dbConnection: IDbConnection;

    constructor( @inject("IDbConnection") dbConnection: IDbConnection) {
        this._dbConnection = dbConnection;
    }

    public async get(index: number) {
       const manager = await this._dbConnection.getEntityManager();
       const user = await manager.findOneById<UserEntity>("UserEntity", index);
       return user;
    }

    public async getByUsername(userName: string) {
        const manager = await this._dbConnection.getEntityManager();
        const user = await manager.findOne<UserEntity>("UserEntity", {username: userName});
        return user;
    }
    public async getByEmail(mail: string) {
        const manager = await this._dbConnection.getEntityManager();
        const user = await manager.findOne<UserEntity>("UserEntity", {email: mail});
        return user;
    }

    public async getAll() {
        const manager = await this._dbConnection.getEntityManager();
        const users = await manager.find<UserEntity>("UserEntity");
        return users;
    }

    public async insert(entity: UserEntity) {
        const manager = await this._dbConnection.getEntityManager();
        console.log("saving file");
        const savedEnt = await manager.save("UserEntity", entity);
        console.log(savedEnt);
    }

    public async delete(index: number) {
        const manager = await this._dbConnection.getEntityManager();
        const deleted = await manager.deleteById("UserEntity", index);
        return deleted;
    }

    public async update(entity: UserEntity) {
        // const manager = await this._dbConnection.getEntityManager();
        // const updatedValue = await manager.updateById<UserEntity>("UserEntity", entity);
        // return updatedValue;
    }
}
