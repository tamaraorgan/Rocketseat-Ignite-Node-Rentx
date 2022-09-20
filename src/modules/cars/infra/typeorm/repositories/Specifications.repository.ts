import { getRepository, Repository } from 'typeorm'
import {
    ICreateSpecificationDTO,
    ISpecificationsRepository
} from '../../../repositories/ISpecifications.repository'

import { Specification } from '../entities/specification.model'

class SpecificationsRepository implements ISpecificationsRepository {
    private repository: Repository<Specification>

    constructor() {
        this.repository = getRepository(Specification)
    }

    async list(): Promise<Specification[]> {
        const specifications = await this.repository.find()

        return specifications
    }

    async create({
        name,
        description
    }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = await this.repository.create({
            name,
            description
        })

        await this.repository.save(specification)
        return specification
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        const specifications = this.repository.findByIds(ids)
        
        return specifications
    }

    async findByName(name: string): Promise<Specification> {
        const specification = await this.repository.findOne({ name })

        return specification
    }
}

export { SpecificationsRepository }
