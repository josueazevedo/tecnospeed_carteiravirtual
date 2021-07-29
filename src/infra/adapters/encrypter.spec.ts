import bcrypt from 'bcrypt'
import { EncrypterAdapter } from './encrypter'

const makeSut = (): any => {
  const sut = new EncrypterAdapter(12)
  return sut
}

describe('Encryter Adapter', () => {
  test('Should call encrypt with correct values', () => {
    const sut = makeSut()
    const encryotSpy = jest.spyOn(bcrypt, 'hash')
    sut.encrypt('any_data')
    expect(encryotSpy).toBeCalledWith('any_data', 12)
  })
})
