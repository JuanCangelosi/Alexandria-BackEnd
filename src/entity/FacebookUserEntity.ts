import { Entity, PrimaryGeneratedColumn, Column, ObjectID, ObjectIdColumn } from "typeorm";
@Entity()
export class UserEntity {

    @ObjectIdColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column()
    birthDate: Date;

    @Column()
    email: string;

}