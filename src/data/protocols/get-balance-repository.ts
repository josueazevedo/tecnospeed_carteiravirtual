import { BalanceModel } from './../../domain/models/balance'

export interface GetBalanceRepository {
  getBalance: () => Promise<BalanceModel>
}
