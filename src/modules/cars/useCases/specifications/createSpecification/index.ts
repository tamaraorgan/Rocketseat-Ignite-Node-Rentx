import { SpecificationsRepository } from '../../../repositories/specifications/Specifications.repository'
import { CreateSpecificationController } from './CreateSpecification.controller'
import { CreateSpecificationUseCase } from './CreateSpecification.useCase'

export default (): CreateSpecificationController => {
    const specificationsRepository = new SpecificationsRepository()
    const createSpecificationUseCase = new CreateSpecificationUseCase(
        specificationsRepository
    )
    const createSpecificationController = new CreateSpecificationController(
        createSpecificationUseCase
    )

    return createSpecificationController
}
