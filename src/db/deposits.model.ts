import { Entity, PrimaryGeneratedColumn, Column, Timestamp, Unique, ManyToOne } from "typeorm"
import { Account } from "./account.model"

@Unique(["txid"])
@Entity()
export class Deposit {
    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    address: string

    @Column()
    account: string
    
    @Column()
    amount: number
    
    @Column()
    "bip125-replaceable": string
    
    @Column()
    blockhash: string
    
    @Column()
    blockindex: number
    
    @Column({type: "bigint"})
    blocktime: number
    
    @Column()
    category: string
    
    @Column()
    confirmations: number
    
    @Column()
    involvesWatchonly: boolean
    
    @Column()
    label: string
    
    @Column({type: "bigint"})
    time: number
    
    @Column({type: "bigint"})
    timereceived: number
    
    @Column({name: "txid"})
    txid: string

    @Column()
    vout: number

    @ManyToOne(() => Account, (account) => account.transactions)
    accountfk?: Account
}