import { GetTransactionsPeriod } from '../../../domain/usecases/transactions/get-transaction-period'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { Validation } from '../../protocols/validation'

export class GetTransactionsListController implements Controller {
  constructor (
    private readonly validator: Validation,
    private readonly getTransactions: GetTransactionsPeriod
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const querys = httpRequest.query
      const isValidOperation = this.validator.validate(querys)

      if (isValidOperation) {
        return badRequest(isValidOperation)
      }
      const page = httpRequest?.query?.page
      const perpage = httpRequest?.query?.perpage
      const startDate = httpRequest?.query?.startdate
      const endDate = httpRequest?.query?.enddate

      const transactions = await this.getTransactions.getTransactions(page, perpage, startDate, endDate)
      return ok(transactions)
    } catch (error) {
      return serverError()
    }
  }
}
