import express from 'express'

import { ensureAuth } from '../middlewares/ensureAuth'

import { CreateSpecificationController } from '../modules/cars/useCases/specifications/createSpecification/CreateSpecification.controller'
import { ListSpecificationController } from '../modules/cars/useCases/specifications/listSpecifications/ListSpecifications.controller'

const createSpecificationController = new CreateSpecificationController()
const listSpecificationsController = new ListSpecificationController()

const specificationsRouter = express.Router()

specificationsRouter.use(ensureAuth)

specificationsRouter.get('/', listSpecificationsController.handle)

specificationsRouter.post('/', createSpecificationController.handle)

export { specificationsRouter }
