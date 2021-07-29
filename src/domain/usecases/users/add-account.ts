import { AccountModel } from '../../models/user'

export interface AddAccountModel {
  name: string
  user: string
  password: string
}

export interface AddAccount {
  add: (AddAccountModel) => Promise<AccountModel>
}
