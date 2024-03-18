import { Account } from "../db/account.model";
import { AppDataSource } from "../db/app_datasource";
import { Deposit } from "../db/deposits.model";

export async function depositsKPIs() {
    const datasource = await AppDataSource.initialize()
    const accountRepository = await datasource.getRepository(Account)
    const depositRepository = await datasource.getRepository(Deposit)
    const depositsWithNoReference = await depositRepository.find({relations: { user: true }})

    return {
        countOfdepositsNoReference: depositsWithNoReference.length
    }
}