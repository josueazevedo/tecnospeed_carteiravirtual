import { Router } from 'express'
import { adaptRoute } from '../adapter/express-route-adapter'
import { makeSignupController } from '../factories/users/add-account-controller-factory'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignupController()))
}
