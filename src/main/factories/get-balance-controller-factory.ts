import { TransactionRelacionalRepository } from '../../infra/db/relationaldb/transaction-repository/transaction'
import { GetBalanceController } from '../../presentation/controllers/get-balance'

export const makeGetBalanceController = (): GetBalanceController => {
  const getBalance = new TransactionRelacionalRepository()
  const getBalanceController = new GetBalanceController(getBalance)
  return getBalanceController
}
