import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm"
import { Deposit } from "./deposits.model"
import { User } from "./user.model"

@Entity()
export class Account {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    address: string

    @Column()
    balance: number

    @ManyToOne(() => User, (user) => user.accounts)
    user: User

    @OneToMany(() => Deposit, (deposit: { accountfk: any }) => deposit.accountfk)
    transactions: Deposit[]

}