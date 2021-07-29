import { CsvGenerator } from '../../data/protocols/csv-generator'

const makeSut = (): any => {
  class CsvGeneratorAdapter implements CsvGenerator {
    createCsv (data: any, fields: any[]): any {
      const csv = 'any_data'
      return csv
    }
  }

  const sut = new CsvGeneratorAdapter()
  return sut
}

describe('CsvGenerator Adapter', () => {
  test('Should call createCsv with correct values', () => {
    const sut = makeSut()
    const csvSpy = jest.spyOn(sut, 'createCsv')
    sut.createCsv('any_data', ['any_fiels'])
    expect(csvSpy).toBeCalledWith('any_data', ['any_fiels'])
  })
})
