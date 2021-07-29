import { Controller } from '../../presentation/protocols/controller'
import { Request, Response } from 'express'
import { HttpRequest } from '../../presentation/protocols/http'

export const adaptFileRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      query: req.query,
      params: req.params
    }
    const httpResponse = await controller.handle(httpRequest)
    res.header('Content-Type', 'text/csv')
    res.attachment('transactions.csv')
    res.send(httpResponse.body)
  }
}
