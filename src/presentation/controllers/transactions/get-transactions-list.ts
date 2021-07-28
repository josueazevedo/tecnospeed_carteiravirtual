import { GetTransactionsPeriod } from '../../../domain/usecases/transactions/get-transaction-period'
import { ok, serverError } from '../../helpers/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class GetTransactionsListController implements Controller {
  constructor (
    private readonly getTransactions: GetTransactionsPeriod
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const page = httpRequest?.query?.page
      const perpage = httpRequest?.query?.perpage

      const transactions = await this.getTransactions.getTransactions(page, perpage)
      return ok(transactions)
    } catch (error) {
      return serverError()
    }
  }
}
