import { inject, injectable } from 'tsyringe'

import { ICategoriesRepository } from '../../../repositories/implementations/categories/ICategories.repository'

import { Category } from '../../../infra/typeorm/entities/category.model'

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
