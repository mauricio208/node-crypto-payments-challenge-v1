import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Account {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    address: string

    @Column()
    balance: number
}