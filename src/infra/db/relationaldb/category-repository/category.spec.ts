import { Category } from '../models/category'
import { CategoryRelacionalRepository } from './category'

describe('Category RelationalDB', () => {
  beforeAll(async () => {
    await Category.destroy({ where: {} })
  })

  beforeEach(async () => {
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

  test('Should return a null if it doesnt find', async () => {
    const sut = new CategoryRelacionalRepository()
    const upUategory = await sut.update({
      id: 99,
      name: 'new_name'
    })
    expect(upUategory).toBeNull()
  })

  test('Should return an category on update success', async () => {
    const sut = new CategoryRelacionalRepository()
    const category = await sut.add({
      name: 'any_name'
    })
    const upUategory = await sut.update({
      id: category.id,
      name: 'new_name'
    })
    expect(category).toBeTruthy()
    expect(upUategory.name).toBe('new_name')
  })

  test('Should return an categories list on success', async () => {
    const sut = new CategoryRelacionalRepository()
    await sut.add({
      name: 'any_name'
    })
    const categories = sut.getCategories()
    expect(categories).toBeTruthy()
  })
})
