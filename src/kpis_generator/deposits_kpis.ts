import { DataSource, IsNull, Repository } from "typeorm";
import { Account } from "../db/account.model";
import { AppDataSource } from "../db/app_datasource";
import { Deposit } from "../db/deposits.model";

export default class DepositKPIs {
    private accountRepository: Repository<Account>
    private depositRepository: Repository<Deposit>

    private constructor(accountRepository: Repository<Account>, depositRepository: Repository<Deposit>){
        this.accountRepository = accountRepository
        this.depositRepository = depositRepository
    }

    public static async init(){
        const accountRepository = await AppDataSource.getRepository(Account)
        const depositRepository = await AppDataSource.getRepository(Deposit)
        return new DepositKPIs(accountRepository, depositRepository)
    }

    async countAndSumAccountWithReference(address: string){
        const [account] = await this.accountRepository.find({where: {address: address}, relations:{transactions: true}})
        return {
            count: account?.transactions.length,
            sum: account?.balance,
        }
    }

    async countAndSumDepositsWithNoReference(){
        const accounts = await this.accountRepository.find({ where: {user: IsNull()}})
        const depositsWithNoReference = await this.depositRepository.find({where: { accountfk: { user: IsNull()}}})
        const sum = accounts.reduce((totalbalance, currentAccount)=>{
            return totalbalance+currentAccount.balance
        }, 0)

        return {
            count: depositsWithNoReference.length,
            sum,
        }
    }

    async minMaxDeposits(){
        const allDeposits = await this.depositRepository.find({ order: { amount: 'DESC'}})
        return { min: allDeposits[allDeposits.length-1].amount, max: allDeposits[0].amount}
    }

    async generate(knownUsers: string[][]) {       
        const noReference = await this.countAndSumDepositsWithNoReference()
        const minMax = await this.minMaxDeposits()
        
        let prompt = []
        for (const knownUser of knownUsers) {
            const accData = await this.countAndSumAccountWithReference(knownUser[1])
            prompt.push(`Deposited for ${knownUser[0]}: count=${accData.count} sum=${accData.sum}`)
        }
        
        return prompt.concat([
            `Deposited without reference: count=${noReference.count} sum=${noReference.sum}`,
            `Smallest valid deposit: ${minMax.min}`,
            `Largest valid deposit: ${minMax.max}`
        ]).join('\n')
        
    }
}
