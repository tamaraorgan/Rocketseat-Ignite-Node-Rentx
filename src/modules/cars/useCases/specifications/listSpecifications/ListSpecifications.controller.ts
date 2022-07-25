import { Request, Response } from 'express'
import { ListSpecificationsUseCase } from './ListSpecifications.useCase'


class ListSpecificationController {
   constructor(private listSpecificationUseCase: ListSpecificationsUseCase) {}

   handle(request: Request, response: Response): Response {
      const specification = this.listSpecificationUseCase.execute()

      return response.json(specification)
   }
}
export { ListSpecificationController }
