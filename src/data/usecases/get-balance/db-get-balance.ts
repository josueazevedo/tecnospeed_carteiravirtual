import { GetBalanceRepository } from '../../protocols/get-balance-repository'
import { BalanceModel } from '../../../domain/models/balance'
import { GetBalance } from '../../../domain/usecases/get-balance'

export class DbGetBalance implements GetBalance {
  constructor (
    private readonly getBalanceRepository: GetBalanceRepository
  ) {}

  async getBalance (): Promise<BalanceModel> {
    const balance = await this.getBalanceRepository.getBalance()
    return balance
  }
}
