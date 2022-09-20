import { ICreateCarsDTO } from '../dtos/ICreateCars.dto'
import { Car } from '../infra/typeorm/entities/car.model'

interface ICarsRepository {
    create(data: ICreateCarsDTO): Promise<Car>
    findById(id: string): Promise<Car>
    findByLicensePlate(license_plate: string): Promise<Car>
    findAvailable(
        name?: string,
        brand?: string,
        category_id?: string
    ): Promise<Car[]>
}

export { ICarsRepository }
