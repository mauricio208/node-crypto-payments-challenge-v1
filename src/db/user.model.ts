import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Account } from "./account.model"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(() => Account, (account: { user: any }) => account.user)
    accounts: Account[]
}