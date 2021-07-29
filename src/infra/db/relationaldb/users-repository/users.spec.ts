import { User } from '../models/user'
import { AccountRelacionalRepository } from './users'

describe('User RelationalDB', () => {
  beforeAll(async () => {
    await User.destroy({ where: {} })
  })

  beforeEach(async () => {
    await User.destroy({ where: {} })
  })

  test('Should return an user on success', async () => {
    const sut = new AccountRelacionalRepository()
    const account = await sut.add({
      name: 'any_name',
      user: 'any_user',
      password: 'any_passowor'
    })
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.user).toBe('any_user')
  })
})
