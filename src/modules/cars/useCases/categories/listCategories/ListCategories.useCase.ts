import { Category } from '../../../entities/category.model'
import { ICategoriesRepository } from '../../../repositories/categories/ICategories.repository'

class ListCategoriesUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute(): Category[] {
    const categories = this.categoriesRepository.list()

    return categories
  }
}

export { ListCategoriesUseCase }

