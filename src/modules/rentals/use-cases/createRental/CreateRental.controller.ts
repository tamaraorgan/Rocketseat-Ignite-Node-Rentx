import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateRentalUseCase } from './CreateRental.use-case'

class CreateRentalController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { car_id, expected_return_date } = request.body
        const { id } = request.user
        const createRentalUseCase = container.resolve(CreateRentalUseCase)

        const rental = await createRentalUseCase.execute({
            user_id: id,
            car_id,
            expected_return_date
        })

        // return response
        //     .status(201)
        //     .json({ message: 'Rental created successfully!' })
        return response.status(201).json(rental)
    }
}

export { CreateRentalController }
