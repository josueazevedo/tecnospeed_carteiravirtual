import { badRequest } from '../helpers/http-helper'
import { Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { Validation } from '../protocols/validation'

export class CreateTransactionController implements Controller {
  constructor (
    private readonly validator: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const transactionData = httpRequest.body
    const isValidOperation = this.validator.validate(transactionData)

    if (isValidOperation) {
      return badRequest(isValidOperation)
    }
    return null
  }
}
