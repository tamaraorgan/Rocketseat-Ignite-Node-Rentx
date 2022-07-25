import { CategoriesRepository } from '../../../repositories/categories/Categories.repository'
import { ImportCategoryController } from './ImportCategory.controller'
import { ImportCategoryUseCase } from './ImportCategory.useCase'

const categoriesRepository = CategoriesRepository.getInstance()
const importCategoryUseCase = new ImportCategoryUseCase(categoriesRepository)
const importCategoryController = new ImportCategoryController(
  importCategoryUseCase
)

export { importCategoryController }

