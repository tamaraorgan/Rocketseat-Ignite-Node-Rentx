import { inject, injectable } from 'tsyringe'
import { Specification } from '../../../infra/typeorm/entities/specification.model'

import { ISpecificationsRepository } from '../../../repositories/ISpecifications.repository'

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
