import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Transaction } from "./transaction.model"

@Entity()
export class Account {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    address: string

    @Column()
    balance: number

    @OneToMany(() => Transaction, (transaction: { accountfk: any }) => transaction.accountfk)
    transactions: Transaction[]
}