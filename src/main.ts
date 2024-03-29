import { APImock } from "./api/api";
import { AppDataSource } from "./db/app_datasource";
import DepositKPIs from "./kpis_generator/deposits_kpis";
import { DBIngestor } from "./transaction_processor/DBIngestor";

async function dbInit(maxRetry= 5, currentRetry = 0){
    try {
        await new Promise(resolve => setTimeout(resolve, 10000));
        await AppDataSource.initialize()
    } catch (error: any) {
        console.error("Error during Data Source initialization")
        if (error?.code == 'ECONNREFUSED') {
            if(maxRetry == currentRetry)  throw error
            await new Promise(resolve => setTimeout(resolve, 1000));
            dbInit(maxRetry, currentRetry+1)
        }else{
            throw error
        }
    }
}

(async function(){

    await dbInit(10)
    const knownUsers = [
        ["Wesley Crusher", "mvd6qFeVkqH6MNAS2Y2cLifbdaX5XUkbZJ"],
        ["Leonard McCoy", "mmFFG4jqAtw9MoCC88hw5FNfreQWuEHADp"],
        ["Jonathan Archer", "mzzg8fvHXydKs8j9D2a8t7KpSXpGgAnk4n"],
        ["Jadzia Dax", "2N1SP7r92ZZJvYKG2oNtzPwYnzw62up7mTo"],
        ["Montgomery Scott", "mutrAf4usv3HKNdpLwVD4ow2oLArL6Rez8"],
        ["James T. Kirk", "miTHhiX3iFhVnAEecLjybxvV5g8mKYTtnM"],
        ["Spock", "mvcyJMiAcSXKAEsQxbW9TYZ369rsMG6rVV"],
    ]

    const dbingest = new DBIngestor()
    for (const userData of knownUsers) {
        const user = await dbingest.addUser({
            name: userData[0]
        })
        await dbingest.addAccount(user, userData[1])
    }

    const api = new APImock()
    for (const apiCallId of [0,1]) {
        const apiResponse = api.listsinceblock(apiCallId)
        await dbingest.checkTransactions(apiResponse.transactions)
    }

    const kpis = await DepositKPIs.init()
    console.log(await kpis.generate(knownUsers))
})();
