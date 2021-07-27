import { InvalidParamError } from '../../errors/invalid-param-error'
import { OperationValidation } from './operation-validation'

describe('Validator OperationValidation', () => {
  test('Should return Invalid Param Error if invalid operation is provider', () => {
    const sut = new OperationValidation()
    const operation = 'any_value'
    const validator = sut.validate(operation)
    expect(validator).toEqual(new InvalidParamError('operation'))
  })

  test('Should return sucesses if valida operation if provider', () => {
    const sut = new OperationValidation()
    jest.spyOn(sut, 'validate').mockReturnValueOnce(null)
    const operation = 'any_operation'
    const validator = sut.validate(operation)
    expect(validator).toBeNull()
  })
})
