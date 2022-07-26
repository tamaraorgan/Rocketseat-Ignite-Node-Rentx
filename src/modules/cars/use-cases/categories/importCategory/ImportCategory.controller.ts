import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ImportCategoryUseCase } from './ImportCategory.use-case'

class ImportCategoryController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { file } = request

        const importCategoryUseCase = container.resolve(ImportCategoryUseCase)

        await importCategoryUseCase.execute(file)

        return response
            .status(201)
            .json({ message: 'Import successfully performed!' })
    }
}
export { ImportCategoryController }
