import { ICreateCarsDTO } from '../../dtos/ICreateCarsDTO'
import { Car } from '../../infra/typeorm/entities/car.model'
import { ICarsRepository } from '../ICars.repository'

class CarsInMemoryRepository implements ICarsRepository {
    cars: Car[] = []
    async create({
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id,
        id
    }: ICreateCarsDTO): Promise<Car> {
        const car = new Car()

        Object.assign(car, {
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
            id
        })

        this.cars.push(car)

        return car
    }

    async findById(id: string): Promise<Car> {
        return this.cars.find((car) => car.id === id)
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        return this.cars.find((car) => car.license_plate === license_plate)
    }

    async findAvailable(
        name?: string,
        brand?: string,
        category_id?: string
    ): Promise<Car[]> {
        const cars = this.cars.filter((car) => {
            if (
                car.available === true ||
                (name && car.name === name) ||
                (brand && car.brand === brand) ||
                (category_id && car.category_id === category_id)
            ) {
                return car
            }
            return null
        })

        return cars
    }
}

export { CarsInMemoryRepository }
