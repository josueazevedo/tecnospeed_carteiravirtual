import { MissingParamError } from '../../errors/missing-param-error'
import { RequiredFieldValidation } from './required-field-validation'

describe('Validator RequiredFieldValidation', () => {
  test('Should return Missing Param Error if no param in provider', async () => {
    const sut = new RequiredFieldValidation('any_param')
    const input = {
      param: 'any_value'
    }
    const validator = sut.validate(input)
    expect(validator).toEqual(new MissingParamError('any_param'))
  })

  test('Should return sucesses if param contains in provider', async () => {
    const sut = new RequiredFieldValidation('param')
    const input = {
      param: 'any_value'
    }
    const validator = sut.validate(input)
    expect(validator).toBeNull()
  })
})
