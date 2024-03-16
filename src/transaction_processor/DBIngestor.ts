import { DataSource } from "typeorm";
import { ITransaction } from "../api/api.entities";
import { AppDataSource } from "../db/app_datasource";
import { Deposit } from "../db/deposits.model";
import { Account } from "../db/account.model";
import { User } from "../db/user.model";

export class DBIngestor{
    private datasource: DataSource
    private constructor(initializedDatasource: DataSource){
        this.datasource = initializedDatasource
    }

    public static async init(){
        const datasource = await AppDataSource.initialize()
        return new DBIngestor(datasource)
    }

    async addUser(userData: { name: string }){
        const userRepository =  this.datasource.getRepository(User)
        const newUser = userRepository.create(userData)
        return await userRepository.save(newUser)
    }

    async addAccount(user: User, address: string){
        const accountRepository = this.datasource.getRepository(Account)
        const newAccount = accountRepository.create({
            address,
            balance: 0,
            user
        })
        return await accountRepository.save(newAccount)   
    }

    async processConfirmed(transaction: ITransaction){
        if (transaction.confirmations > 6) {
            const accountRepository = this.datasource.getRepository(Account)
            let account = await accountRepository.findOneBy({address:transaction.address})
            if(!account){
                const newAccount = await accountRepository.create({
                    address: transaction.address,
                    balance: 0,
                })
                account = await accountRepository.save(newAccount)            
            }
            const newDeposit = await this.datasource.getRepository(Deposit).create(transaction as Deposit)
            const deposit = await this.datasource.getRepository(Deposit).save(newDeposit)
            await accountRepository.update(account.id, {balance: account.balance + deposit.amount})
        }
    }

    checkTransactions(transactions: ITransaction[]) {
        for (const transaction of transactions) {
               
            
        }
    }
}
