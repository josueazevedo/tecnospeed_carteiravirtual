import { DbGetBalance } from '../../../data/usecases/transactions/db-get-balance'
import { TransactionRelacionalRepository } from '../../../infra/db/relationaldb/transaction-repository/transaction'
import { GetBalanceController } from '../../../presentation/controllers/transactions/get-balance'

export const makeGetBalanceController = (): GetBalanceController => {
  const getRepository = new TransactionRelacionalRepository()
  const getBalanceDB = new DbGetBalance(getRepository)
  const getBalanceController = new GetBalanceController(getBalanceDB)
  return getBalanceController
}
