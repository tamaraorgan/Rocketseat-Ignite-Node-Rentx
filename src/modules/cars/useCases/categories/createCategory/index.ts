import { CategoriesRepository } from '../../../repositories/categories/Categories.repository'
import { CreateCategoryController } from './CreateCategory.controller'
import { CreateCategoryUseCase } from './CreateCategory.useCase'

export default (): CreateCategoryController => {
    const categoriesRepository = new CategoriesRepository()
    const createCategoryUseCase = new CreateCategoryUseCase(
        categoriesRepository
    )
    const createCategoryController = new CreateCategoryController(
        createCategoryUseCase
    )

    return createCategoryController
}
