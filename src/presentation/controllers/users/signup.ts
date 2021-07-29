import { AddAccount } from '../../../domain/usecases/users/add-account'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { Validation } from '../../protocols/validation'

export class SignupController implements Controller {
  constructor (
    private readonly validator: Validation,
    private readonly addAccount: AddAccount
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accountData = httpRequest.body
      const isValidOperation = this.validator.validate(accountData)

      if (isValidOperation) {
        return badRequest(isValidOperation)
      }
      const account = await this.addAccount.add(accountData)
      return ok(account)
    } catch (error) {
      return serverError()
    }
  }
}
