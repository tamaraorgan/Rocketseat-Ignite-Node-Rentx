import express from 'express'
import { categoriesRouter } from './categories.routes'
import { specificationsRouter } from './specifications.routes'

const router = express.Router()

router.use('/categories', categoriesRouter)
router.use('/specifications', specificationsRouter)

export { router }

