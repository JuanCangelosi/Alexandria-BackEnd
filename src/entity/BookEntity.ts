import { Entity, PrimaryGeneratedColumn, Column, ObjectID, ObjectIdColumn } from "typeorm";
import { AuthorEntity } from "./AuthorEntity";

@Entity()
export class BookEntity {

    @ObjectIdColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    subtitle: string;

    @Column()
    chapterAmount: number;

    @Column()
    firstPublishYear: number;

    @Column()
    fileDir: string;

    @Column()
    coverDir: string;

    @Column()
    language: string[];

    @Column()
    ISBN: string[];

    @Column(type => AuthorEntity)
    author: AuthorEntity;

    constructor() {
        this.author = new AuthorEntity();

    }
}