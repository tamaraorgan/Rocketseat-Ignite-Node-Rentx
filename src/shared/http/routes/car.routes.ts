import express from 'express'
import multer from 'multer'

import { CreateCarController } from '../../../modules/cars/useCases/cars/createCars/CreateCar.controller'
import { ListAvailableCarsController } from '../../../modules/cars/useCases/cars/listAvailableCars/ListAvailableCars.controller'
import { UploadImagensCarController } from '../../../modules/cars/useCases/cars/uploadImagens/UploadImagensCar.controller'
import { CreateSpecificationCarController } from '../../../modules/cars/useCases/createSpecificationsCar/CreateSpecificationsCar.controller'

import uploadConfig from '../../../config/upload'
import { ensureAdmin } from '../middlewares/ensureAdmin'
import { ensureAuth } from '../middlewares/ensureAuth'

const createCarControle = new CreateCarController()
const listAvailableCarsController = new ListAvailableCarsController()
const createSpecificationsCarController = new CreateSpecificationCarController()
const uploadImagensCarController = new UploadImagensCarController()

const upload = multer(uploadConfig.upload('./tmp/cars'))

const carsRouter = express.Router()

carsRouter.post('/', ensureAuth, ensureAdmin, createCarControle.handle)
carsRouter.get('/available', listAvailableCarsController.handle)
carsRouter.post(
    '/specification/:id',
    ensureAuth,
    ensureAdmin,
    createSpecificationsCarController.handle
)

carsRouter.post(
    '/images/:id',
    ensureAuth,
    ensureAdmin,
    upload.array('images'),
    uploadImagensCarController.handle
)

export { carsRouter }
