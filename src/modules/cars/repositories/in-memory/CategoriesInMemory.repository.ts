
import { Category } from '../../infra/typeorm/entities/category.model'
import {
    ICategoriesRepository,
    ICreateCategoryDTO
} from '../implementations/categories/ICategories.repository'

class CategoriesInMemoryRepository implements ICategoriesRepository {
    categories: Category[] = []

    async findByName(name: string): Promise<Category> {
        const category = await this.categories.find(
            (category) => category.name === name
        )
        return category
    }
    async list(): Promise<Category[]> {
        const all = await this.categories
        return all
    }
    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        const category = new Category()

        Object.assign(category, {
            name,
            description
        })

        this.categories.push(category)
    }
}
export { CategoriesInMemoryRepository }
