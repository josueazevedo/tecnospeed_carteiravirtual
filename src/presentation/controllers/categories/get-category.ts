import { GetCategories } from '../../../domain/usecases/categories/get-categories'
import { ok, serverError } from '../../helpers/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpResponse } from '../../protocols/http'

export class GetCategoryController implements Controller {
  constructor (
    private readonly getCategory: GetCategories
  ) {}

  async handle (): Promise<HttpResponse> {
    try {
      const balance = await this.getCategory.getCategories()
      return ok(balance)
    } catch (error) {
      return serverError()
    }
  }
}
