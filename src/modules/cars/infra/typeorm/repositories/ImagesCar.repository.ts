import { getRepository, Repository } from 'typeorm'
import { IImagesCarRepository } from '../../../repositories/IImagesCar.repository'
import { ImagesCar } from '../entities/imagesCar.model'

class ImagesCarRepository implements IImagesCarRepository {
    private repository: Repository<ImagesCar>

    constructor() {
        this.repository = getRepository(ImagesCar)
    }
    async create(car_id: string, image_name: string): Promise<ImagesCar> {
        const imageCar = this.repository.create({
            car_id,
            image_name
        })

        await this.repository.save(imageCar)

        return imageCar
    }
}

export { ImagesCarRepository }
