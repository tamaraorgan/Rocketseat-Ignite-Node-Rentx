import { CategoriesRepository } from '../../../repositories/categories/Categories.repository'
import { ListCategoriesController } from './ListCategories.controller'
import { ListCategoriesUseCase } from './ListCategories.useCase'

const categoriesRepository = null
const listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository)
const listCategoriesController = new ListCategoriesController(
    listCategoriesUseCase
)

export { listCategoriesController }
