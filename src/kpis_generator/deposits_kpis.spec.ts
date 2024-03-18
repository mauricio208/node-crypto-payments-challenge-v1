import { strict as assert } from 'assert'
import { depositsKPIs}  from './deposits_kpis'

describe('KPIs tests', () => {
    it("Get Deposit KPIs", async () => {
       const kpis = await depositsKPIs()
       console.log(kpis)
       assert.ok(!!kpis?.countOfdepositsNoReference)
    })
}) 
