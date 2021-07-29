import { GetTransactionsPeriodCsv } from '../../../domain/usecases/transactions/get-transaction-period-csv'
import { CsvGenerator } from '../../protocols/csv-generator'
import { GetTransactionsPeriodCsvRepository } from '../../protocols/transactions/get-transactions-period-csv-repository'

export class DbGetTransactionsPeriodCsv implements GetTransactionsPeriodCsv {
  constructor (
    private readonly getTransactionsPeriodRepository: GetTransactionsPeriodCsvRepository,
    private readonly csvGenerator: CsvGenerator
  ) {}

  async getTransactionsFilterDate (startDate: string, endDate: string): Promise<any> {
    const transactions = await this.getTransactionsPeriodRepository.getTransactionsFilterDate(startDate, endDate)
    const data = transactions.rows
    const fields = ['transaction_id', 'value', 'operation', 'notes', 'category']
    const csv = this.csvGenerator.createCsv(data, fields)
    return csv
  }
}
