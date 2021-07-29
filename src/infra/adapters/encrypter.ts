import { Encrypter } from '../../data/protocols/encrypter'
import bcrypt from 'bcrypt'

export class EncrypterAdapter implements Encrypter {
  constructor (
    private readonly salt: number
  ) {}

  async encrypt (value: string): Promise<string> {
    const hash = await bcrypt.hash(value, this.salt)
    return hash
  }
}
