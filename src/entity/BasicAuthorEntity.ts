import { Entity, PrimaryGeneratedColumn, Column, ObjectID, ObjectIdColumn, CreateDateColumn } from "typeorm";

@Entity()
export class BasicAuthorEntity {

    @ObjectIdColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    alsoKnowAs: string[];

    @Column()
    birthYear: number;

    @CreateDateColumn()
    addDate: Date;
}