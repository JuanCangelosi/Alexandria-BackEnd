import { Entity, PrimaryGeneratedColumn, Column, ObjectID, ObjectIdColumn, Index } from "typeorm";
@Entity()
export class UserLikesEntity {

    @ObjectIdColumn()
    id: number;

    @Column()
    id_user: number;

    @Column()
    likes: string[];

    @Column()
    dislikes: string[];
}