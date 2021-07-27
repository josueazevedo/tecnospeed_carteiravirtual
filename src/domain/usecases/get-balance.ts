import { BalanceModel } from './../models/balance'

export interface GetBalance {
  get: () => Promise<BalanceModel>
}
