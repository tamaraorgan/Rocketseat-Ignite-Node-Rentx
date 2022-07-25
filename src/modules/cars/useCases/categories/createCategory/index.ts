import { CategoriesRepository } from '../../../repositories/categories/Categories.repository'
import { CreateCategoryController } from './CreateCategory.controller'
import { CreateCategoryUseCase } from './CreateCategory.useCase'

const categoriesRepository = CategoriesRepository.getInstance()
const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository)
const createCategoryController = new CreateCategoryController(
  createCategoryUseCase
)

export { createCategoryController }

