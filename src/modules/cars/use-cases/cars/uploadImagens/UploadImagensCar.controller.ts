import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UploadImagensCarUseCase } from './UploadImagensCar.use-case'

interface IFiles {
    filename: string
}

class UploadImagensCarController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params
        const images = request.files as IFiles[]

        const uploadImagensCarUseCase = container.resolve(
            UploadImagensCarUseCase
        )

        const images_name = images.map((file) => file.filename)

        await uploadImagensCarUseCase.execute({
            car_id: id,
            images_name
        })

        return response
            .status(201)
            .json({ message: 'Images added successfully' })
    }
}

export { UploadImagensCarController }
