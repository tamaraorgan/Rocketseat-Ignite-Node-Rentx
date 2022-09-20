import express from 'express'
import multer from 'multer'

import { CreateRentalController } from '../../../modules/rentals/use-cases/CreateRental.controller'

import { ensureAuth } from '../middlewares/ensureAuth.middleware'

const createCarController = new CreateRentalController()

const rentalsRouter = express.Router()

rentalsRouter.post('/', ensureAuth, createCarController.handle)

export { rentalsRouter }
