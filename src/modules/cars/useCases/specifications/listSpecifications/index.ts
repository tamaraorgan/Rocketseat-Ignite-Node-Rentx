import { SpecificationsRepository } from '../../../repositories/specifications/Specifications.repository'
import { ListSpecificationsUseCase } from './ListSpecifications.useCase'
import { ListSpecificationController } from './ListSpecifications.controller'

export default (): ListSpecificationController => {
    const specificationRepository = new SpecificationsRepository()
    const listSpecificationsUseCase = new ListSpecificationsUseCase(
        specificationRepository
    )
    const listSpecificationsController = new ListSpecificationController(
        listSpecificationsUseCase
    )

    return listSpecificationsController
}
