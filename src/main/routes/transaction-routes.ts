import { Router } from 'express'
import { adaptRoute } from '../adapter/express-route-adapter'
import { makeCreateTransactionController } from '../factories/transactions/create-transaction-controller-factory'
import { makeGetBalanceController } from '../factories/transactions/get-balance-controller-factory'
import { makeGetTransactionPeriodController } from '../factories/transactions/get-transactions-period-controller-factory'

export default (router: Router): void => {
  router.post('/transaction', adaptRoute(makeCreateTransactionController()))
  router.get('/balance', adaptRoute(makeGetBalanceController()))
  router.get('/transaction', adaptRoute(makeGetTransactionPeriodController()))
}
