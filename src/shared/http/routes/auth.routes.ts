import express from 'express'

import { AuthUserController } from '../../../modules/accounts/use-cases/AuthUsers/AuthUser.controller'

const authRouter = express.Router()

const authUserController = new AuthUserController()

authRouter.post('/', authUserController.handle)

export { authRouter }
