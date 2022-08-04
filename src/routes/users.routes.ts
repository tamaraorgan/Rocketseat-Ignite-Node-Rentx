import express from 'express'

import { CreateUsersController } from '../modules/accounts/useCases/CreateUsers/CreateUser.controller'

const usersRouter = express.Router()

const createUsersController = new CreateUsersController()

usersRouter.post('/', createUsersController.handle)

export { usersRouter }
