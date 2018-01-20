import { Entity, PrimaryGeneratedColumn, Column, ObjectID, ObjectIdColumn, Index } from "typeorm";
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
    @Index({unique: true})
    email: string;

    @Column()
    @Index({unique: true})
    username: string;

    @Column()
    password: string;

    ParseDTO(json: any) {
        if (json) {
            if (json.id) {
                this.id = + json.id;
            }
            if (json.name) {
                this.name = json.name;
            }
            if (json.surname) {
                this.surname = json.surname;
            }
            if (json.email) {
                this.email = json.email;
            }
            if (json.username) {
                this.username = json.username;
            }
            if (json.password) {
                this.password = json.password;
            }
            if (json.birthDate) {
                this.birthDate = new Date();
            }
        }
    }

}