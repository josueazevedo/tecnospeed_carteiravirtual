import { ok, serverError } from './../helpers/http-helper'
import { GetBalance } from '../../domain/usecases/get-balance'
import { HttpResponse } from '../protocols/http'
import { Controller } from './../protocols/controller'

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
