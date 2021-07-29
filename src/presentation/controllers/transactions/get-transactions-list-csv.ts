import { GetTransactionsPeriodCsv } from '../../../domain/usecases/transactions/get-transaction-period-csv'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { Validation } from '../../protocols/validation'

export class GetTransactionsListCsvController implements Controller {
  constructor (
    private readonly validator: Validation,
    private readonly getTransactions: GetTransactionsPeriodCsv
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const querys = httpRequest.query
      const isValidOperation = this.validator.validate(querys)

      if (isValidOperation) {
        return badRequest(isValidOperation)
      }
      const startDate = httpRequest?.query?.startdate
      const endDate = httpRequest?.query?.enddate

      const transactions = await this.getTransactions.getTransactionsFilterDate(startDate, endDate)
      return ok(transactions)
    } catch (error) {
      return serverError()
    }
  }
}
