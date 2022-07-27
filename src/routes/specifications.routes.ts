import express from 'express'

import  createSpecificationController  from '../modules/cars/useCases/specifications/createSpecification'
import  listSpecificationsController  from '../modules/cars/useCases/specifications/listSpecifications'

const specificationsRouter = express.Router()

specificationsRouter.get('/', (request, response) => {
  return listSpecificationsController().handle(request, response)
})

specificationsRouter.post('/', (request, response) => {
  return createSpecificationController().handle(request, response)
})

export { specificationsRouter }

