import express from 'express'
import setupMiddleware from '../config/middlewares'
import setupRoutes from '../config/routes'

const app = express()
setupMiddleware(app)
setupRoutes(app)
export default app
