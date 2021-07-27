import { AddTransaction } from '../../../domain/usecases/add-transaction'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { Validation } from '../../protocols/validation'

export class CreateTransactionController implements Controller {
  constructor (
    private readonly validator: Validation,
    private readonly addTransaction: AddTransaction
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const transactionData = httpRequest.body
      const isValidOperation = this.validator.validate(transactionData)

      if (isValidOperation) {
        return badRequest(isValidOperation)
      }
      const newTransaction = await this.addTransaction.add(transactionData)
      return ok(newTransaction)
    } catch (error) {
      return serverError()
    }
  }
}
