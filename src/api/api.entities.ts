// Transaction objecct example:
// {
//     "account": "",
//     "address": "mutrAf4usv3HKNdpLwVD4ow2oLArL6Rez8",
//     "amount": 2.96774,
//     "bip125-replaceable": "no",
//     "blockhash": "e229b17680d878b35519a01e4ae972a79fe47da8474667097162042e5ba8ddb1",
//     "blockindex": 57,
//     "blocktime": 1627607548873,
//     "category": "receive",
//     "confirmations": 85,
//     "involvesWatchonly": true,
//     "label": "",
//     "time": 1627607521059,
//     "timereceived": 1627607521059,
//     "txid": "2c1212495b23f32f93fb9ac02eb9c683fc14533ca12146ac512e2967e5ee1b74",
//     "vout": 63,
//     "walletconflicts": []
// }

interface ITransaction {
    account: string
    address: string
    amount: number
    "bip125-replaceable": string
    blockhash: string
    blockindex: number
    blocktime: number
    category: string
    confirmations: number
    involvesWatchonly: boolean
    label: string
    time: number
    timereceived: number
    txid: string
    vout: number
    walletconflicts: any[]
}

interface ApiResponse {
    lastblock: string
    removed: any[]
    transactions: ITransaction[]
}

export {
    ITransaction,
    ApiResponse
}

