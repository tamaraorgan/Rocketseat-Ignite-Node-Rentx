import { inject, injectable } from 'tsyringe'
import { Specification } from '../../../entities/Specification.model'
import { ISpecificationsRepository } from '../../../repositories/specifications/ISpecifications.repository'

@injectable()
class ListSpecificationsUseCase {
    constructor(
        @inject('SpecificationsRepository')
        private specificationsRepository: ISpecificationsRepository
    ) {}

    async execute(): Promise<Specification[]> {
        const specifications = await this.specificationsRepository.list()

        return specifications
    }
}

export { ListSpecificationsUseCase }
