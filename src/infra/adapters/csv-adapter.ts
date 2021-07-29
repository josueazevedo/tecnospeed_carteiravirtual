import { Parser } from 'json2csv'
import { CsvGenerator } from '../../data/protocols/csv-generator';

export class CsvGeneratorAdapter implements CsvGenerator {
  createCsv (data: any, fields: any[]): any {
    const json2csv = new Parser({ fields: fields })
    const csv = json2csv.parse(data)
    return csv
  }
}
