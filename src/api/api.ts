import { Transaction, ApiResponse } from "./api.entities"
import transaction1 from "../../node-crypto-payments-challenge-v1/transactions-1.json"
import transaction2 from "../../node-crypto-payments-challenge-v1/transactions-2.json"


export class APImock {
    responses: ApiResponse[]
    constructor() {
        this.responses = [transaction1, transaction2]
    }

    listsinceblock(index: number) {
        return this.responses[index]
    }
}


