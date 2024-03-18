import { DataSource } from "typeorm"
import { Account } from "./account.model"
import { Deposit } from "./deposits.model"
import { User } from "./user.model"

const AppDataSource = new DataSource({
    type: "mariadb",
    host: "db", // "127.0.0.1", 
    port: 3306,
    username: "user",
    password: "password",
    database: "mydatabase",
    synchronize: true,
    entities: [Account, Deposit, User]
})

export { AppDataSource }