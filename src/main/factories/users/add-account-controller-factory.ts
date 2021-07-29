import { DbAddAccount } from '../../../data/usecases/account/db-add-account'
import { EncrypterAdapter } from '../../../infra/adapters/encrypter'
import { AccountRelacionalRepository } from '../../../infra/db/relationaldb/users-repository/users'
import { SignupController } from '../../../presentation/controllers/users/signup'
import { Validation } from '../../../presentation/protocols/validation'
import { RequiredFieldValidation } from '../../../presentation/validation/validators/required-field-validation'
import { ValidationComposite } from '../../../presentation/validation/validators/validation-composite'

export const makeSignupController = (): SignupController => {
  const validations: Validation[] = []
  const fields = ['name', 'user', 'password']
  fields.forEach(field => {
    validations.push(new RequiredFieldValidation(field))
  })
  const validator = new ValidationComposite(validations)
  const accoutRelacionalRepository = new AccountRelacionalRepository()
  const encrypt = new EncrypterAdapter(12)
  const dbAddTransaction = new DbAddAccount(encrypt, accoutRelacionalRepository)
  const addSignupController = new SignupController(validator, dbAddTransaction)
  return addSignupController
}
