import { Router } from 'express'
import { adaptRoute } from '../adapter/express-route-adapter'
import { makeCreateTransactionController } from '../factories/transactions/create-transaction-controller-factory'
import { makeGetBalanceController } from '../factories/transactions/get-balance-controller-factory'

export default (router: Router): void => {
  router.post('/transaction', adaptRoute(makeCreateTransactionController()))
  router.get('/balance', adaptRoute(makeGetBalanceController()))
}
