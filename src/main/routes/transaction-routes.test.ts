import request from 'supertest'
import app from '../config/app'

describe('Body Parser Middleware', () => {
  test('Should return an transacion on success', async () => {
    await request(app).post('/transaction ')
      .send({
        value: 1,
        operation: 'in'
      })
      .expect(200)
  })

  test('Should return an balance on success', async () => {
    await request(app).get('/balance ')
      .expect(200)
  })
})
