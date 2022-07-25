import { Specification } from '../../../model/Specification.model'
import { ISpecificationsRepository } from '../../../repositories/specifications/ISpecifications.repository'

class ListSpecificationsUseCase {
   constructor(private SpecificationsRepository: ISpecificationsRepository) {}

   execute(): Specification[] {
      const specifications = this.SpecificationsRepository.list()

      return specifications
   }
}

export { ListSpecificationsUseCase }
