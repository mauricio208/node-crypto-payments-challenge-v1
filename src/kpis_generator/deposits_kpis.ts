import { IsNull } from "typeorm";
import { Account } from "../db/account.model";
import { AppDataSource } from "../db/app_datasource";
import { Deposit } from "../db/deposits.model";

export async function depositsKPIs() {
    const datasource = await AppDataSource.initialize()
    const accountRepository = await datasource.getRepository(Account)
    const depositRepository = await datasource.getRepository(Deposit)
    const accountsNoReference =  await accountRepository.find({ where: { user: IsNull()}})
    const depositsWithNoReference = await depositRepository.find({where: { accountfk: { user: IsNull()}}})

    return {
        accountsNoReference: accountsNoReference.length,
        countOfdepositsNoReference: depositsWithNoReference.length
    }
}