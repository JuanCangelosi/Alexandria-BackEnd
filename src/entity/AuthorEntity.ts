import { Entity, PrimaryGeneratedColumn, Column, ObjectID, ObjectIdColumn } from "typeorm";

@Entity()
export class AuthorEntity {

    @ObjectIdColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    alsoKnowAs: string[];

    @Column()
    birthYear: number;
}