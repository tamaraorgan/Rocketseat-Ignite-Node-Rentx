import { Request, Response } from 'express'
import { CreateSpecificationUseCase } from './CreateSpecification.useCase'

class CreateSpecificationController {
  constructor(private createSpecificationUseCase: CreateSpecificationUseCase) {}

  handle(request: Request, response: Response) {
    const { name, description } = request.body

    this.createSpecificationUseCase.execute({ name, description })

    return response
      .status(201)
      .json({ message: 'Specification created successfully!' })
  }
}

export { CreateSpecificationController }

