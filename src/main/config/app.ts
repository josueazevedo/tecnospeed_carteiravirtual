import express from 'express'
import setupMiddleware from './middlewares'
import setupRoutes from './routes'

const app = express()
setupMiddleware(app)
setupRoutes(app)
app.use(express.static('public'))

export default app
