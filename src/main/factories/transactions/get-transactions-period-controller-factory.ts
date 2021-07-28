import { DbGetTransactionsPeriod } from '../../../data/usecases/transactions/db-get-transactions-period'
import { TransactionRelacionalRepository } from '../../../infra/db/relationaldb/transaction-repository/transaction'
import { GetTransactionsListController } from '../../../presentation/controllers/transactions/get-transactions-list'

export const makeGetTransactionPeriodController = (): GetTransactionsListController => {
  const transactionRelacionalRepository = new TransactionRelacionalRepository()
  const getTransactionsDB = new DbGetTransactionsPeriod(transactionRelacionalRepository)
  const getTransactionPeriodController = new GetTransactionsListController(getTransactionsDB)
  return getTransactionPeriodController
}
