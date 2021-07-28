import { ListModel } from '../../../domain/models/list-model'
import { GetTransactionsPeriod } from '../../../domain/usecases/transactions/get-transaction-period'
import { GetTransactionsPeriodRepository } from '../../protocols/transactions/get-transactions-period-repository'

export class DbGetTransactionsPeriod implements GetTransactionsPeriod {
  constructor (
    private readonly getTransactionsPeriodRepository: GetTransactionsPeriodRepository
  ) {}

  async getTransactions (page: number, perpage: number): Promise<ListModel> {
    const offset = page ? page * perpage : 0
    const transactions = await this.getTransactionsPeriodRepository.getTransactions(offset, perpage)
    const totalPages = Math.ceil(transactions.count / perpage) - 1
    const listTransactions = {
      total: transactions.count,
      data: transactions.rows,
      totalPages: totalPages,
      currentPage: page
    }
    return listTransactions
  }
}
