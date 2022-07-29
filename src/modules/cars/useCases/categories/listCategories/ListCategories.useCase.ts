import { inject, injectable } from 'tsyringe'
import { Category } from '../../../entities/category.model'
import { ICategoriesRepository } from '../../../repositories/categories/ICategories.repository'

@injectable()
class ListCategoriesUseCase {
    constructor(
        @inject('CategoriesRepository')
        private categoriesRepository: ICategoriesRepository
    ) {}

    async execute(): Promise<Category[]> {
        const categories = await this.categoriesRepository.list()

        return categories
    }
}

export { ListCategoriesUseCase }
