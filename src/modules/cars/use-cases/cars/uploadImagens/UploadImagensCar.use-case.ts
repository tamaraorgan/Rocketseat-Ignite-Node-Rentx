import { inject, injectable } from 'tsyringe'
import { IImagesCarRepository } from '../../../repositories/IImagesCar.repository'

interface IRequest {
    car_id: string
    images_name: string[]
}

@injectable()
class UploadImagensCarUseCase {
    constructor(
        @inject('ImagesCarRepository')
        private imagesCarRepository: IImagesCarRepository
    ) {}
    async execute({ car_id, images_name }: IRequest) {
        images_name.map(async (image) => {
            await this.imagesCarRepository.create(car_id, image)
        })
    }
}

export { UploadImagensCarUseCase }
