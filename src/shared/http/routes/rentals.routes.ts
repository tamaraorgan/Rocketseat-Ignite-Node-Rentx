import express from 'express'
import multer from 'multer'

import { CreateRentalController } from '../../../modules/rentals/use-cases/createRental/CreateRental.controller'
import { DevolutionRentalController } from '../../../modules/rentals/use-cases/devolutionRental/DevolutionRental.controller'
import { ListRentalsByUserController } from '../../../modules/rentals/use-cases/listRentaslByUser/ListRentalsByUser.controller'

import { ensureAuth } from '../middlewares/ensureAuth.middleware'

const createCarController = new CreateRentalController()
const devolutionRentalController = new DevolutionRentalController()
const listRentalsByUserController = new ListRentalsByUserController()

const rentalsRouter = express.Router()

rentalsRouter.post('/', ensureAuth, createCarController.handle)
rentalsRouter.post(
    '/devolution/:id',
    ensureAuth,
    devolutionRentalController.handle
)
rentalsRouter.get('/user', ensureAuth, listRentalsByUserController.handle)

export { rentalsRouter }
