import { Express, Router } from 'express'
import transactionRoutes from '../routes/transaction-routes'

export default (app: Express): void => {
  const router = Router()
  transactionRoutes(router)
  app.use('', router)
}
