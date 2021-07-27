import { CreateTransactionController } from '../../presentation/controllers/create-transaction'
import { RequiredFieldValidation } from '../../presentation/validation/validators/required-field-validation'
import { ValidationComposite } from '../../presentation/validation/validators/validation-composite'
import { Validation } from '../../presentation/protocols/validation'
import { TransactionRelacionalRepository } from '../../infra/db/relationaldb/transaction-repository/transaction'
import { OperationValidation } from '../../presentation/validation/validators/operation-validation'

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
