import { Router } from 'express'
import { adaptRoute } from '../adapter/express-route-adapter'
import { makeCreateTransactionController } from '../factories/transaction'

export default (router: Router): void => {
  router.post('/transaction', adaptRoute(makeCreateTransactionController()))
}
