import { inject, injectable } from 'tsyringe'

import { ISpecificationsRepository } from '../../../repositories/implementations/specifications/ISpecifications.repository'
import { Specification } from '../../../infra/typeorm/entities/Specification.model'

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
