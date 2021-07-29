import { DbGetTransactionsPeriod } from '../../../data/usecases/transactions/db-get-transactions-period'
import { TransactionRelacionalRepository } from '../../../infra/db/relationaldb/transaction-repository/transaction'
import { GetTransactionsListController } from '../../../presentation/controllers/transactions/get-transactions-list'
import { Validation } from '../../../presentation/protocols/validation'
import { RequiredFieldValidation } from '../../../presentation/validation/validators/required-field-validation'
import { ValidationComposite } from '../../../presentation/validation/validators/validation-composite'

export const makeGetTransactionPeriodController = (): GetTransactionsListController => {
  const validations: Validation[] = []
  const fields = ['page', 'perpage', 'startdate', 'enddate']
  fields.forEach(field => {
    validations.push(new RequiredFieldValidation(field))
  })
  const validator = new ValidationComposite(validations)
  const transactionRelacionalRepository = new TransactionRelacionalRepository()
  const getTransactionsDB = new DbGetTransactionsPeriod(transactionRelacionalRepository)
  const getTransactionPeriodController = new GetTransactionsListController(validator, getTransactionsDB)
  return getTransactionPeriodController
}
