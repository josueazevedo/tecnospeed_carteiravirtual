import { UpdateCategory } from '../../../domain/usecases/categories/update-category'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { Validation } from '../../protocols/validation'

export class UpdateCategoryController implements Controller {
  constructor (
    private readonly validator: Validation,
    private readonly updateCategory: UpdateCategory

  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const categoryData = httpRequest.body
      const isValidOperation = this.validator.validate(categoryData)

      if (isValidOperation) {
        return badRequest(isValidOperation)
      }
      const category = await this.updateCategory.update(categoryData)
      return ok(category)
    } catch (e) {
      return serverError()
    }
  }
}
