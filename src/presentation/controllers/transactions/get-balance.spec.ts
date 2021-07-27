import { BalanceModel } from '../../../domain/models/balance'
import { GetBalance } from '../../../domain/usecases/get-balance'
import { ServerError } from '../../errors/server-error'
import { GetBalanceController } from './get-balance'

const makeSut = (): any => {
  class GetBalanceStub implements GetBalance {
    async getBalance (): Promise<BalanceModel> {
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
    jest.spyOn(getBalanceStub, 'getBalance').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle()
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError())
  })

  test('Should return 200 if no throws', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle()
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual({
      value: 1
    })
  })
})
