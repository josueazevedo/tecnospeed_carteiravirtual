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

  test('Should EncrypterAdapter return data on success', () => {
    const sut = makeSut()
    const csv = sut.encrypt('any_data', 12)
    expect(csv).toBeTruthy()
  })
})
