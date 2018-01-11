import { EntityManager } from "typeorm";

export interface IDbConnection {

    getEntityManager(): Promise<EntityManager>;
}