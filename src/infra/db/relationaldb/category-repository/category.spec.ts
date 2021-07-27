import { Category } from '../models/category'
import { CategoryRelacionalRepository } from './category'

describe('Category RelationalDB', () => {
  beforeAll(async () => {
    await Category.destroy({ where: {} })
  })

  test('Should return an category on success', async () => {
    const sut = new CategoryRelacionalRepository()
    const category = await sut.add({
      name: 'any_name'
    })
    expect(category).toBeTruthy()
    expect(category.id).toBeTruthy()
    expect(category.name).toBe('any_name')
  })
})
