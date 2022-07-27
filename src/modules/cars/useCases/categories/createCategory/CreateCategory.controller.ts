import { Request, Response } from 'express'

import { CreateCategoryUseCase } from './CreateCategory.useCase'

class CreateCategoryController {
    constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { name, description } = request.body

        await this.createCategoryUseCase.execute({ name, description })

        return response
            .status(201)
            .json({ message: 'Category created successfully!' })
    }
}

export { CreateCategoryController }
