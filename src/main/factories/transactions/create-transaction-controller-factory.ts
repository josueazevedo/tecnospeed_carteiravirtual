import { TransactionRelacionalRepository } from '../../../infra/db/relationaldb/transaction-repository/transaction'
import { CreateTransactionController } from '../../../presentation/controllers/transactions/create-transaction'
import { Validation } from '../../../presentation/protocols/validation'
import { OperationValidation } from '../../../presentation/validation/validators/operation-validation'
import { RequiredFieldValidation } from '../../../presentation/validation/validators/required-field-validation'
import { ValidationComposite } from '../../../presentation/validation/validators/validation-composite'

export const makeCreateTransactionController = (): CreateTransactionController => {
  const validations: Validation[] = []
  const fields = ['value', 'operation']
  fields.forEach(field => {
    validations.push(new RequiredFieldValidation(field))
  })
  validations.push(new OperationValidation())
  const validator = new ValidationComposite(validations)
  const addTransaction = new TransactionRelacionalRepository()
  const createTransactionController = new CreateTransactionController(validator, addTransaction)
  return createTransactionController
}
