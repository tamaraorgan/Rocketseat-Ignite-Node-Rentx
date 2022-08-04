import express from 'express'

import { authRouter } from './auth.routes'
import { categoriesRouter } from './categories.routes'
import { specificationsRouter } from './specifications.routes'
import { usersRouter } from './users.routes'

const router = express.Router()

router.use('/categories', categoriesRouter)
router.use('/specifications', specificationsRouter)
router.use('/users', usersRouter)
router.use('/sessions', authRouter)

export { router }
