import { AddAccountRepository } from '../../../../data/protocols/users/add-account-repository'
import { AccountModel } from '../../../../domain/models/user'
import { AddAccountModel } from '../../../../domain/usecases/users/add-account'
import { User } from '../models/user'

export class AccountRelacionalRepository implements AddAccountRepository {
  async add (account: AddAccountModel): Promise<AccountModel> {
    const newAccount = await User.create(account, { raw: true })
    return newAccount
  }
}
