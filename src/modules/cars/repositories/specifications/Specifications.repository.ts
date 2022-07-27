import { getRepository, Repository } from 'typeorm'
import { Specification } from '../../entities/Specification.model'
import {
    ISpecificationsRepository,
    ICreateSpecificationDTO
} from './ISpecifications.repository'

class SpecificationsRepository implements ISpecificationsRepository {
    private specification: Repository<Specification>

    constructor() {
        this.specification = getRepository(Specification)
    }

    async findByName(name: string): Promise<Specification> {
        const specification = await this.specification.findOne({ name })

        return specification
    }

    async list(): Promise<Specification[]> {
        const specifications = await this.specification.find()

        return specifications
    }

    async create({
        name,
        description
    }: ICreateSpecificationDTO): Promise<void> {
        const specification = await this.specification.create({
            name,
            description
        })

        this.specification.save(specification)
    }
}

export { SpecificationsRepository }
