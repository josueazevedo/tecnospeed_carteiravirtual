import { ListModel } from '../../../domain/models/list-model'
import { GetTransactionsPeriod } from '../../../domain/usecases/transactions/get-transaction-period'
import { GetTransactionsPeriodRepository } from '../../protocols/transactions/get-transactions-period-repository'

export class DbGetTransactionsPeriod implements GetTransactionsPeriod {
  constructor (
    private readonly getTransactionsPeriodRepository: GetTransactionsPeriodRepository
  ) {}

  async getTransactions (page: number, perpage: number): Promise<ListModel> {
    const transactions = await this.getTransactionsPeriodRepository.getTransactions(page, perpage)
    const totalPages = Math.ceil(transactions.cont / perpage)
    const listTransactions = {
      total: transactions.cont,
      data: transactions.rows,
      totalPages: totalPages,
      currentPage: page
    }
    return listTransactions
  }
}
