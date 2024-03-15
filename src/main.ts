import { Account } from "./db/account.model";
import { AppDataSource} from "./db/app_datasource"

console.log(`Docker is working`);
(async function(){
    await AppDataSource.initialize()
    const tables = await AppDataSource.query(`SHOW TABLES;`)
    console.log("tables: ", tables)
    const accountRepository = AppDataSource.getRepository(Account)
    const account = new Account()
    account.address = "t7est1"
    account.balance = 0
    await accountRepository.save(account)
    const accounts = await accountRepository.find()
    console.log("accounts: ", accounts)
})();