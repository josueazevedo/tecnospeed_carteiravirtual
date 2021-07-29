import { DbGetTransactionsPeriodCsv } from '../../../data/usecases/transactions/db-get-transactions-period-csv'
import { CsvGeneratorAdapter } from '../../../infra/adapters/csv-adapter'
import { TransactionRelacionalRepository } from '../../../infra/db/relationaldb/transaction-repository/transaction'
import { GetTransactionsListCsvController } from '../../../presentation/controllers/transactions/get-transactions-list-csv'
import { Validation } from '../../../presentation/protocols/validation'
import { RequiredFieldValidation } from '../../../presentation/validation/validators/required-field-validation'
import { ValidationComposite } from '../../../presentation/validation/validators/validation-composite'

export const makeGetTransactionPeriodCsvController = (): GetTransactionsListCsvController => {
  const validations: Validation[] = []
  const fields = ['startdate', 'enddate']
  fields.forEach(field => {
    validations.push(new RequiredFieldValidation(field))
  })
  const validator = new ValidationComposite(validations)
  const transactionRelacionalRepository = new TransactionRelacionalRepository()
  const csvAdapter = new CsvGeneratorAdapter()
  const getTransactionsDB = new DbGetTransactionsPeriodCsv(transactionRelacionalRepository, csvAdapter)
  const getTransactionPeriodController = new GetTransactionsListCsvController(validator, getTransactionsDB)
  return getTransactionPeriodController
}
