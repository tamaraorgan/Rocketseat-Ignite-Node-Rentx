import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateSpecificationCarUseCase } from './CreateSpecificationsCar.use-case'

class CreateSpecificationCarController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params
        const { specifications_id } = request.body

        const createSpecificationCarUseCase = container.resolve(CreateSpecificationCarUseCase)

        const cars = await createSpecificationCarUseCase.execute({
            car_id: id,
            specifications_id
        })

        return response.json(cars)
    }
}

export { CreateSpecificationCarController }
