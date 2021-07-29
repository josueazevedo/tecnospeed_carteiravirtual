import request from 'supertest'
import app from '../config/app'

describe('Transaction Router', () => {
  test('Should return an transacion on success', async () => {
    await request(app).post('/signup ')
      .send({
        name: 'any_name',
        user: 'any_user',
        password: 'any'
      })
      .expect(200)
  })
})
