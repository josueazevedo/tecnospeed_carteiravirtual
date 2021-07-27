import { InvalidParamError } from '../../errors/invalid-param-error'
import { Validation } from '../../protocols/validation'

export class OperationValidation implements Validation {
  validate (input: any): Error {
    if (input.operation !== 'in' && input.operation !== 'out') {
      return new InvalidParamError('operation')
    }
    return null
  }
}
