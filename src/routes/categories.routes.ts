import express from 'express'
import multer from 'multer'

import { CreateCategoryController } from '../modules/cars/useCases/categories/createCategory/CreateCategory.controller'
import { ImportCategoryController } from '../modules/cars/useCases/categories/importCategory/ImportCategory.controller'
import { ListCategoriesController } from '../modules/cars/useCases/categories/listCategories/ListCategories.controller'

const createCategoryController = new CreateCategoryController()
const importCategoryController = new ImportCategoryController()
const listCategoriesController = new ListCategoriesController()

const categoriesRouter = express.Router()
const upload = multer({
    dest: './tmp'
})

categoriesRouter.get('/', listCategoriesController.handle)

categoriesRouter.post('/', createCategoryController.handle)

categoriesRouter.post(
    '/import',
    upload.single('file'),
    importCategoryController.handle
)

export { categoriesRouter }
