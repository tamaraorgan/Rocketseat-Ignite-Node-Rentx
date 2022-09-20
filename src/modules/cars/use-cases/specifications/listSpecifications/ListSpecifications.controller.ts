import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ListSpecificationsUseCase } from './ListSpecifications.use-case'

class ListSpecificationController {
    async handle(request: Request, response: Response): Promise<Response> {
        const listSpecificationUseCase = container.resolve(
            ListSpecificationsUseCase
        )

        const specification = await listSpecificationUseCase.execute()

        return response.json(specification)
    }
}
export { ListSpecificationController }
