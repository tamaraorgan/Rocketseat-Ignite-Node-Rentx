import { Specification } from '../../model/Specification.model'
import {
  ISpecificationsRepository,
  ICreateSpecificationDTO
} from './ISpecifications.repository'

class SpecificationsRepository implements ISpecificationsRepository {
  private specifications: Specification[] = []

  private static INSTANCE: SpecificationsRepository

  private constructor() {
    this.specifications = []
  }

  public static getInstance(): SpecificationsRepository {
    if (!SpecificationsRepository.INSTANCE) {
      SpecificationsRepository.INSTANCE = new SpecificationsRepository()
    }
    return SpecificationsRepository.INSTANCE
  }

  findByName(name: string) {
    const specification = this.specifications.find(
      (specification) => specification.name === name
    )

    return specification
  }

  list(): Specification[] {
    return this.specifications
  }

  create({ name, description }: ICreateSpecificationDTO): void {
    const specification = new Specification()

    Object.assign(specification, {
      name,
      description,
      created_at: new Date()
    })

    this.specifications.push(specification)
  }
}

export { SpecificationsRepository }

