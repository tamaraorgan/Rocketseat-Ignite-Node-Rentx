import { Category } from "../infra/typeorm/entities/category.model"



//DTO -> Data Transfer object - pega os valores da rota e transfere para o controllers
interface ICreateCategoryDTO {
    name: string
    description: string
}

interface ICategoriesRepository {
    findByName(name: string): Promise<Category>
    list(): Promise<Category[]>
    create({ name, description }: ICreateCategoryDTO): Promise<void>
}

export { ICategoriesRepository, ICreateCategoryDTO }
