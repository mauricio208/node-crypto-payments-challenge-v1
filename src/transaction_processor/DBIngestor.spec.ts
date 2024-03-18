import { strict as assert } from 'assert'
import { DBIngestor } from "./DBIngestor";
import { APImock } from '../api/api';

describe('Database tests', () => {
    let dbingest: DBIngestor;
    before(async()=>{
        const knownUsers = [
            ["Wesley Crusher", "mvd6qFeVkqH6MNAS2Y2cLifbdaX5XUkbZJ"],
            ["Leonard McCoy", "mmFFG4jqAtw9MoCC88hw5FNfreQWuEHADp"],
            ["Jonathan Archer", "mzzg8fvHXydKs8j9D2a8t7KpSXpGgAnk4n"],
            ["Jadzia Dax", "2N1SP7r92ZZJvYKG2oNtzPwYnzw62up7mTo"],
            ["Montgomery Scott", "mutrAf4usv3HKNdpLwVD4ow2oLArL6Rez8"],
            ["James T. Kirk", "miTHhiX3iFhVnAEecLjybxvV5g8mKYTtnM"],
            ["Spock", "mvcyJMiAcSXKAEsQxbW9TYZ369rsMG6rVV"],
        ]
        dbingest = new DBIngestor()
        for (const userData of knownUsers) {
            const user = await dbingest.addUser({
                name: userData[0]
            })
            await dbingest.addAccount(user, userData[1])
        }
    })
    
    // it("Test transaction Check", async () => {
    //     const api = new APImock()
    //     for (const apiCallId of [0,1]) {
    //         const apiResponse = api.listsinceblock(apiCallId)
    //         await dbingest.checkTransactions(apiResponse.transactions)
    //     }
    //     assert.ok(true)
    // })
}) 
