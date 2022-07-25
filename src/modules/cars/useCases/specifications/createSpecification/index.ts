import { SpecificationsRepository } from '../../../repositories/specifications/Specifications.repository'
import { CreateSpecificationController } from './CreateSpecification.controller'
import { CreateSpecificationUseCase } from './CreateSpecification.useCase'

const specificationsRepository = SpecificationsRepository.getInstance()
const createSpecificationUseCase = new CreateSpecificationUseCase(
  specificationsRepository
)
const createSpecificationController = new CreateSpecificationController(
  createSpecificationUseCase
)

export { createSpecificationController }

