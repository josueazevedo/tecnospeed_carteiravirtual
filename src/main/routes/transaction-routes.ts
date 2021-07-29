import { Router } from 'express'
import { adaptRoute } from '../adapter/express-route-adapter'
import { adaptFileRoute } from '../adapter/express-route-file-adpater'
import { makeCreateTransactionController } from '../factories/transactions/create-transaction-controller-factory'
import { makeGetBalanceController } from '../factories/transactions/get-balance-controller-factory'
import { makeGetTransactionPeriodController } from '../factories/transactions/get-transactions-period-controller-factory'
import { makeGetTransactionPeriodCsvController } from '../factories/transactions/get-transactions-period-csv-controller-factory'

export default (router: Router): void => {
  router.post('/transaction', adaptRoute(makeCreateTransactionController()))
  router.get('/balance', adaptRoute(makeGetBalanceController()))
  router.get('/transaction', adaptRoute(makeGetTransactionPeriodController()))
  router.get('/transaction/export', adaptFileRoute(makeGetTransactionPeriodCsvController()))
}
