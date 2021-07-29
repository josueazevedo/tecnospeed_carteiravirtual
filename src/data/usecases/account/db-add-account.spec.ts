import { AccountModel } from '../../../domain/models/user'
import { Encrypter } from '../../protocols/encrypter'
import { AddAccountRepository } from '../../protocols/users/add-account-repository'
import { DbAddAccount } from './db-add-account'

describe('DbAddAccount Usercase', () => {
  const makeSut = (): any => {
    const accountFake = {
      id: 1,
      name: 'any_name',
      user: 'any_user',
      password: 'any_password'
    }
    class EncrypterStub implements Encrypter {
      async encrypt (value: string): Promise<string> {
        return new Promise(resolve => resolve('hash_passowrd'))
      }
    }
    class AddAccountRepositoryStub implements AddAccountRepository {
      async add (AddAccountModel): Promise<AccountModel> {
        return new Promise(resolve => resolve(accountFake))
      }
    }
    const encrypterStub = new EncrypterStub()
    const addAccountRepositoryStub = new AddAccountRepositoryStub()
    const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub)
    return {
      sut,
      encrypterStub,
      accountFake,
      addAccountRepositoryStub
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

  test('Should DbAddAccount return accout on success', async () => {
    const { sut, accountFake } = makeSut()
    const categoryData = {
      name: 'any_name',
      user: 'any_user',
      password: 'hash_password'
    }
    const account = await sut.add(categoryData)
    console.log(account)
    expect(account).toEqual(accountFake)
  })
})
