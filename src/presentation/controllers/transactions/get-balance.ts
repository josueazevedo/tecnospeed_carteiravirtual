import { GetBalance } from '../../../domain/usecases/transactions/get-balance'
import { ok, serverError } from '../../helpers/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpResponse } from '../../protocols/http'

export class GetBalanceController implements Controller {
  constructor (
    private readonly getBalance: GetBalance
  ) {}

  async handle (): Promise<HttpResponse> {
    try {
      const balance = await this.getBalance.getBalance()
      return ok(balance)
    } catch (error) {
      return serverError()
    }
  }
}
