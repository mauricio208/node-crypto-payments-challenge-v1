import { strict as assert } from 'assert'
import { Transaction, ApiResponse } from "./api.entities"
import APImock from "./api"

describe('APImock test', () => {
    it("should return more than 0 transactions", () => {
        const api = new APImock()
        const apiresponse: ApiResponse = api.listsinceblock(0)
        assert.ok(apiresponse?.transactions?.length > 0)        
    })
}) 