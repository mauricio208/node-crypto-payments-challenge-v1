import { strict as assert } from 'assert'
import { Account } from "./account.model"
import { AppDataSource } from "./app_datasource"

describe('Database tests', () => {
    before(async()=>{
        await AppDataSource.initialize()
    })
    
    it("should return two tables", async () => {
        const tables = await AppDataSource.query(`SHOW TABLES;`)
        console.log("tables: ", tables) 
        assert.ok(tables.length == 2 > 0)        
    })

    it("should create an account with address: testaccount", async () => {
        const accountRepository = AppDataSource.getRepository(Account)
        const account = new Account()
        account.address = "testaccount"
        account.balance = 0
        await accountRepository.save(account)
        const accountQueryResuts = await accountRepository.findOneBy({
            address:"testaccount"
        })
        assert.ok(!!accountQueryResuts)
    })
}) 