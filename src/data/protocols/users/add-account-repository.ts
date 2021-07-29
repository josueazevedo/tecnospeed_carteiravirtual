import { AccountModel } from '../../../domain/models/user'

export interface AddAccountRepository {
  add: (AddAccountModel) => Promise<AccountModel>
}
