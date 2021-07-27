import request from 'supertest'
import app from '../config/app'

describe('Cors Middleware', () => {
  test('Should enable Cors', async () => {
    app.get('/test', (req, res) => {
      res.send(req.body)
    })
    await request(app).get('/test')
      .expect('Access-Control-Allow-Origin', '*')
  })
})
