import express from 'express'
import multer from 'multer'

import { ensureAuth } from '../middlewares/ensureAuth.middleware'

import uploadConfig from '../../../config/upload'
import { CreateUsersController } from '../../../modules/accounts/use-cases/CreateUsers/CreateUser.controller'
import { UpdateAvatarController } from '../../../modules/accounts/use-cases/updateAvatar/UpdateAvatar.controller'

const usersRouter = express.Router()

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'))

const createUsersController = new CreateUsersController()
const updateAvatarController = new UpdateAvatarController()

usersRouter.post('/', createUsersController.handle)
usersRouter.patch(
    '/avatar',
    ensureAuth,
    uploadAvatar.single('avatar'),
    updateAvatarController.handle
)

export { usersRouter }
