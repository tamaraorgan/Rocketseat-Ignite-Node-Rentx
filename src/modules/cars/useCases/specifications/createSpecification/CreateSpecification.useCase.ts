import { inject, injectable } from 'tsyringe'
import { ISpecificationsRepository } from '../../../repositories/specifications/ISpecifications.repository'

interface IRequest {
    name: string
    description: string
}

@injectable()
class CreateSpecificationUseCase {
    constructor(
        @inject('SpecificationsRepository')
        private specificationRepository: ISpecificationsRepository
    ) {}

    async execute({ name, description }: IRequest): Promise<void> {
        const specificationAlreadyExists =
            await this.specificationRepository.findByName(name)

        if (specificationAlreadyExists) {
            throw new Error('Specification already exists!')
        }

        await this.specificationRepository.create({ name, description })
    }
}

export { CreateSpecificationUseCase }
