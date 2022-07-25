import express from 'express'
import multer from 'multer'
import { createCategoryController } from '../modules/cars/useCases/categories/createCategory'
import { importCategoryController } from '../modules/cars/useCases/categories/importCategory'
import { listCategoriesController } from '../modules/cars/useCases/categories/listCategories'

const categoriesRouter = express.Router()
const upload = multer({
  dest: './tmp'
})

categoriesRouter.get('/', (request, response) => {
  return listCategoriesController.handle(request, response)
})

categoriesRouter.post('/', (request, response) => {
  return createCategoryController.handle(request, response)
})

categoriesRouter.post('/import', upload.single('file'), (request, response) => {
  return importCategoryController.handle(request, response)
})

export { categoriesRouter }

