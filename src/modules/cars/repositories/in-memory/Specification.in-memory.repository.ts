import { isDebuggerStatement } from 'typescript'
import { Specification } from '../../infra/typeorm/entities/specification.model'
import {
    ICreateSpecificationDTO,
    ISpecificationsRepository
} from '../ISpecifications.repository'

class SpecificationInMemoryRepository implements ISpecificationsRepository {
    specifications: Specification[] = []

    list(): Promise<Specification[]> {
        throw new Error('Method not implemented.')
    }
    async create({
        name,
        description
    }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = new Specification()

        Object.assign(specification, {
            name,
            description
        })

        await this.specifications.push(specification)

        return specification
    }
    async findByName(name: string): Promise<Specification> {
        return this.specifications.find(
            (specification) => specification.name === name
        )
    }
    async findByIds(ids: string[]): Promise<Specification[]> {
        const allSpecifications = this.specifications.filter((specification) =>
            ids.includes(specification.id)
        )

        return allSpecifications
    }
}
export { SpecificationInMemoryRepository }
