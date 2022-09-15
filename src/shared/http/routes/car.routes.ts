import express from 'express'
import { CreateCarController } from '../../../modules/cars/useCases/cars/createCars/CreateCar.controller'
import { ListAvailableCarsController } from '../../../modules/cars/useCases/cars/listAvailableCars/ListAvailableCars.controller'

const createCarControle = new CreateCarController()
const listAvailableCarsController = new ListAvailableCarsController

const carsRouter = express.Router()

carsRouter.post('/', createCarControle.handle)
carsRouter.get('/available', listAvailableCarsController.handle)

export { carsRouter }
