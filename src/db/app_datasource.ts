import { DataSource } from "typeorm"
import { Account } from "./account.model"
import { Transaction } from "./transaction.model"

const AppDataSource = new DataSource({
    type: "mariadb",
    host: "mariadb",
    port: 3306,
    username: "user",
    password: "password",
    database: "mydatabase",
    entities: [Account, Transaction]
})

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

export = AppDataSource