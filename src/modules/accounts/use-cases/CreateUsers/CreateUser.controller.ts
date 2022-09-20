import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateUserUseCase } from './CreateUser.use-case'

class CreateUsersController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, email, password, driver_license } = request.body

        const createUserUseCase = container.resolve(CreateUserUseCase)

        await createUserUseCase.execute({
            name,
            email,
            password,
            driver_license
        })

        return response
            .status(201)
            .json({ message: 'User created successfully!' })
    }
}

export { CreateUsersController }
