import request from 'supertest'
import app from '../config/app'

describe('Body Parser Middleware', () => {
  test('Should parse body as json', async () => {
    app.post('/test', (req, res) => {
      res.send(req.body)
    })
    await request(app).post('/test').send({ param: 'any_value' }).expect({ param: 'any_value' })
  })
})
