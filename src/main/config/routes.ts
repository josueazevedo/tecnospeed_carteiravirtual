import { Express, Router } from 'express'
import categoryRoutes from '../routes/category-routes'
import userRouter from '../routes/users-router'
import transactionRoutes from '../routes/transaction-routes'

export default (app: Express): void => {
  const router = Router()
  transactionRoutes(router)
  categoryRoutes(router)
  userRouter(router)
  app.use('/api', router)
}
