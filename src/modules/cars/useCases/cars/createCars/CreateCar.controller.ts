import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateCarUseCase } from './CreateCar.useCase'

class CreateCarController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id
        } = request.body
        const createCarUseCase = container.resolve(CreateCarUseCase)

        await createCarUseCase.execute({
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id
        })
        return response
            .status(201)
            .json({ message: 'Car created successfully!' })
    }
}

export { CreateCarController }
