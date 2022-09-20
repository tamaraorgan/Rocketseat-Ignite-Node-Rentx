import express from 'express'
import multer from 'multer'

import { CreateCategoryController } from '../../../modules/cars/use-cases/categories/createCategory/CreateCategory.controller'
import { ImportCategoryController } from '../../../modules/cars/use-cases/categories/importCategory/ImportCategory.controller'
import { ListCategoriesController } from '../../../modules/cars/use-cases/categories/listCategories/ListCategories.controller'
import { ensureAdmin } from '../middlewares/ensureAdmin.middleware'
import { ensureAuth } from '../middlewares/ensureAuth.middleware'

const createCategoryController = new CreateCategoryController()
const importCategoryController = new ImportCategoryController()
const listCategoriesController = new ListCategoriesController()

const categoriesRouter = express.Router()
const upload = multer({
    dest: './tmp'
})

categoriesRouter.get('/', listCategoriesController.handle)

categoriesRouter.post(
    '/',
    ensureAuth,
    ensureAdmin,
    createCategoryController.handle
)

categoriesRouter.post(
    '/import',
    upload.single('file'),
    ensureAuth,
    ensureAdmin,
    importCategoryController.handle
)

export { categoriesRouter }
