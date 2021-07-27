import { BalanceModel } from './../models/balance'

export interface GetBalance {
  getBalance: () => Promise<BalanceModel>
}
