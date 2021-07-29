import { GetTransactionsPeriodCsv } from '../../../domain/usecases/transactions/get-transaction-period-csv'
import { GetTransactionsPeriodCsvRepository } from '../../protocols/transactions/get-transactions-period-csv-repository'

export class DbGetTransactionsPeriodCsv implements GetTransactionsPeriodCsv {
  constructor (
    private readonly getTransactionsPeriodRepository: GetTransactionsPeriodCsvRepository
  ) {}

  async getTransactionsFilterDate (startDate: string, endDate: string): Promise<any> {
    const transactions = await this.getTransactionsPeriodRepository.getTransactionsFilterDate(startDate, endDate)
    const csv = transactions.rows
    return csv
  }
}
