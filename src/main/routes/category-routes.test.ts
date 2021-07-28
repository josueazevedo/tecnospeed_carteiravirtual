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

  test('Should return 404 if not find category', async () => {
    await request(app).put('/category ')
      .send({
        id: 1,
        name: 'any_name'
      })
      .expect(404)
  })

  test('Should return an category on success', async () => {
    await request(app).post('/category ')
      .send({
        name: 'any_name'
      }).then(async category => {
        await request(app).put('/category')
          .send({
            id: category.body.id,
            name: 'new_name'
          }).expect(200)
      })
  })
})
