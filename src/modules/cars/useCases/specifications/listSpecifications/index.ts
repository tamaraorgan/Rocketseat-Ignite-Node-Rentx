import { SpecificationsRepository } from "../../../repositories/specifications/Specifications.repository"
import { ListSpecificationsUseCase } from "./ListSpecifications.useCase"
import { ListSpecificationController } from "./ListSpecifications.controller"


const specificationRepository = SpecificationsRepository.getInstance()
const listSpecificationsUseCase = new ListSpecificationsUseCase(specificationRepository)
const listSpecificationsController = new ListSpecificationController(
   listSpecificationsUseCase
)

export { listSpecificationsController }
