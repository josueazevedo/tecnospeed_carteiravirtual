import { Express, Router } from 'express'
import categoryRoutes from '../routes/category-routes'
import transactionRoutes from '../routes/transaction-routes'

export default (app: Express): void => {
  const router = Router()
  transactionRoutes(router)
  categoryRoutes(router)
  app.use('', router)
}
