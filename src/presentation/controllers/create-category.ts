import { AddCategory } from '../../domain/usecases/add-category'
import { badRequest, ok, serverError } from '../helpers/http-helper'
import { Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { Validation } from '../protocols/validation'

export class CreateCategoryController implements Controller {
  constructor (
    private readonly validator: Validation,
    private readonly addCategory: AddCategory
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const categoryData = httpRequest.body
      const isValidOperation = this.validator.validate(categoryData)

      if (isValidOperation) {
        return badRequest(isValidOperation)
      }
      const category = await this.addCategory.add(categoryData)
      return ok(category)
    } catch (e) {
      return serverError()
    }
  }
}
