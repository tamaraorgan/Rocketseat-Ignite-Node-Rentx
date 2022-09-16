import { ImagesCar } from '../infra/typeorm/entities/imagesCar.model'

interface IImagesCarRepository {
    create(car_id: string, image_name: string): Promise<ImagesCar>
}

export { IImagesCarRepository }
