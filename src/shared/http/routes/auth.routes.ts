import express from 'express'

import { AuthUserController } from '../../../modules/accounts/useCases/AuthUsers/AuthUser.controller'

const authRouter = express.Router()

const authUserController = new AuthUserController()

authRouter.post('/', authUserController.handle)

export { authRouter }
