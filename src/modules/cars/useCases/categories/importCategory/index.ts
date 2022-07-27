import { CategoriesRepository } from '../../../repositories/categories/Categories.repository'
import { ImportCategoryController } from './ImportCategory.controller'
import { ImportCategoryUseCase } from './ImportCategory.useCase'


    const categoriesRepository = null
    const importCategoryUseCase = new ImportCategoryUseCase(
        categoriesRepository
    )
    const importCategoryController = new ImportCategoryController(
        importCategoryUseCase
    )

   export {importCategoryController}

