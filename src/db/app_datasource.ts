import { DataSource } from "typeorm"
import { Account } from "./account.model"
import { Transaction } from "./transaction.model"

const AppDataSource = new DataSource({
    type: "mariadb",
    host: "127.0.0.1", //db,
    port: 3306,
    username: "user",
    password: "password",
    database: "mydatabase",
    synchronize: true,
    entities: [Account, Transaction]
})

export { AppDataSource }