import { IEntity } from "../entity/IEntity";


export interface IEntityDbManager {
    get(index: number): Promise<IEntity>;
    getAll(): Promise<IEntity[]>;
    insert(entity: IEntity);
    delete(index: number);
    update(entity: IEntity);
}