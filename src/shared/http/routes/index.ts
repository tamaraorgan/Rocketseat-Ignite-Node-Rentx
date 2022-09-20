import express from 'express'

import { authRouter } from './auth.routes'
import { carsRouter } from './car.routes'
import { categoriesRouter } from './categories.routes'
import { rentalsRouter } from './rentals.routes'
import { specificationsRouter } from './specifications.routes'
import { usersRouter } from './users.routes'

const router = express.Router()

router.use('/categories', categoriesRouter)
router.use('/specifications', specificationsRouter)
router.use('/users', usersRouter)
router.use('/sessions', authRouter)
router.use('/cars', carsRouter)
router.use('/rentals', rentalsRouter)

export { router }
