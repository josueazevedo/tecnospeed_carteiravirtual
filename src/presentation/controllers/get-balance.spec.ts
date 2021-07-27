import { BalanceModel } from './../../domain/models/balance'
import { ServerError } from '../errors/server-error'
import { GetBalance } from '../../domain/usecases/get-balance'
import { GetBalanceController } from './get-balance'

const makeSut = (): any => {
  class GetBalanceStub implements GetBalance {
    async get (): Promise<BalanceModel> {
      const fakeBalance = {
        value: 1
      }
      return new Promise(resolve => resolve(fakeBalance))
    }
  }
  const getBalanceStub = new GetBalanceStub()
  const sut = new GetBalanceController(getBalanceStub)
  return {
    sut,
    getBalanceStub
  }
}

describe('Get Balance Controller', () => {
  test('Should return 500 if getBalance return throws', async () => {
    const { sut, getBalanceStub } = makeSut()
    jest.spyOn(getBalanceStub, 'get').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle()
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should return 200 if data is provided', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle()
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual({
      value: 1
    })
  })
})
