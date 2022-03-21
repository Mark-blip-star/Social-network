import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity("roles")
export class Roles {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    title:string

    @Column()
    allows:string
}
