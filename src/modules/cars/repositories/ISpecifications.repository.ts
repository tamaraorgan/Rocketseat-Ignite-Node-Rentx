import { Specification } from "../infra/typeorm/entities/Specification.model"


//DTO -> Data Transfer object - pega os valores da rota e transfere para o controllers
interface ICreateSpecificationDTO {
    name: string
    description: string
}

interface ISpecificationsRepository {
    list(): Promise<Specification[]>
    create({ name, description }: ICreateSpecificationDTO): Promise<Specification>
    findByName(name: string): Promise<Specification>
    findByIds(ids:string[]): Promise<Specification[]>
}

export { ISpecificationsRepository, ICreateSpecificationDTO }
