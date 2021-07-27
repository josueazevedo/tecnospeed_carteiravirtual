import request from 'supertest'
import app from '../config/app'

describe('Category Router', () => {
  test('Should return an category on success', async () => {
    await request(app).post('/category ')
      .send({
        name: 'any_name'
      })
      .expect(200)
  })
})
