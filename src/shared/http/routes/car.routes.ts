import express from 'express'
import multer from 'multer'

import { CreateCarController } from '../../../modules/cars/use-cases/cars/createCars/CreateCar.controller'
import { ListAvailableCarsController } from '../../../modules/cars/use-cases/cars/listAvailableCars/ListAvailableCars.controller'
import { UploadImagensCarController } from '../../../modules/cars/use-cases/cars/uploadImagens/UploadImagensCar.controller'
import { CreateSpecificationCarController } from '../../../modules/cars/use-cases/createSpecificationsCar/CreateSpecificationsCar.controller'

import uploadConfig from '../../../config/upload'
import { ensureAdmin } from '../middlewares/ensureAdmin.middleware'
import { ensureAuth } from '../middlewares/ensureAuth.middleware'

const createCarController = new CreateCarController()
const listAvailableCarsController = new ListAvailableCarsController()
const createSpecificationsCarController = new CreateSpecificationCarController()
const uploadImagensCarController = new UploadImagensCarController()

const upload = multer(uploadConfig.upload('./tmp/cars'))

const carsRouter = express.Router()

carsRouter.post('/', ensureAuth, ensureAdmin, createCarController.handle)
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
