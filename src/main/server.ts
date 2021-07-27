import { database } from '../infra/db/relationaldb/helpers/sequelize-helper'
import * as dotenv from 'dotenv'
import app from './config/app'
dotenv.config()

database.authenticate().then(() => {
  app.listen(4000, () => console.log('Server running at http://localhost:4000'))
}).catch(() => {
  console.log('Server error')
})
