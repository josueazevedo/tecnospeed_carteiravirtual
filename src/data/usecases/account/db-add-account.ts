import { AccountModel } from '../../../domain/models/user';
import { AddAccount, AddAccountModel } from '../../../domain/usecases/users/add-account';
import { Encrypter } from '../../protocols/encrypter';
import { AddAccountRepository } from '../../protocols/users/add-account-repository';

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly encrypter: Encrypter,
    private readonly addAcountRepository: AddAccountRepository
  ) {}

  async add (account: AddAccountModel): Promise<AccountModel> {
    const passwordHash = await this.encrypter.encrypt(account.password)
    const newAccount = await this.addAcountRepository.add(Object.assign({}, account, { password: passwordHash }))
    return newAccount
  }
}
