import { Router } from 'express'
import { adaptRoute } from '../adapter/express-route-adapter'
import { makeCreateTransactionController } from '../factories/create-transaction-controller-factory'
import { makeGetBalanceController } from '../factories/get-balance-controller-factory'

export default (router: Router): void => {
  router.post('/transaction', adaptRoute(makeCreateTransactionController()))
  router.get('/balance', adaptRoute(makeGetBalanceController()))
}
