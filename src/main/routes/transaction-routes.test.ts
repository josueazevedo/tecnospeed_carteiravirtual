import request from 'supertest'
import app from '../config/app'

describe('Transaction Router', () => {
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

  test('Should return an list transactions on success', async () => {
    await request(app).post('/transaction ')
      .send({
        value: 1,
        operation: 'in'
      }).then(async () => {
        await request(app).get('/transaction?page=0&perpage=2&startdate=2020-01-01&enddate=3000-01-01')
          .expect(200)
      })
  })

  test('Should return an list transactions on success', async () => {
    await request(app).post('/transaction ')
      .send({
        value: 1,
        operation: 'in'
      }).then(async () => {
        await request(app).get('/transaction/export?page=0&perpage=2&startdate=2020-01-01&enddate=3000-01-01')
          .expect(200)
      })
  })
})
