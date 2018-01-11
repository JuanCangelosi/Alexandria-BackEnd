import { createConnection, Connection, getMongoManager, MongoEntityManager } from "typeorm";
import { injectable, inject } from "inversify";
import { IDbConnection } from "./IDbConnection";

@injectable()
export class MongoDbConnection implements IDbConnection {

    private connection: MongoEntityManager;

    public async getEntityManager(): Promise<MongoEntityManager> {
        if ( ! this.connection ) {
            this.connection = await getMongoManager();
        }
        return this.connection;
    }

}
