import { Encrypter } from '../../protocols/encrypter'
import { DbAddAccount } from './db-add-account'

describe('DbAddAccount Usercase', () => {
  const makeSut = (): any => {
    class EncrypterStub implements Encrypter {
      async encrypt (value: string): Promise<string> {
        return new Promise(resolve => resolve('h ash_passowrd'))
      }
    }
    const encrypterStub = new EncrypterStub()
    const sut = new DbAddAccount(encrypterStub)

    return {
      sut,
      encrypterStub
    }
  }

  test('Should call Encrypter with corret password', async () => {
    const { sut, encrypterStub } = makeSut()
    const encrypetSpy = jest.spyOn(encrypterStub, 'encrypt')
    const accountdata = {
      name: 'any_name',
      user: 'any_user',
      password: 'any_password'
    }
    await sut.add(accountdata)
    expect(encrypetSpy).toBeCalledWith('any_password')
  })

  test('Should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockResolvedValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const accountdata = {
      name: 'any_name',
      user: 'any_user',
      password: 'any_password'
    }
    const promise = sut.add(accountdata)
    await expect(promise).rejects.toThrow()
  })
})
