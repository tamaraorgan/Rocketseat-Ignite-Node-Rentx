import { getRepository, Repository } from 'typeorm'
import { ICreateCarsDTO } from '../../../dtos/ICreateCarsDTO'
import { ICarsRepository } from '../../../repositories/ICars.repository'
import { Car } from '../entities/car.model'

class CarsRepository implements ICarsRepository {
    private repository: Repository<Car>

    constructor() {
        this.repository = getRepository(Car)
    }

    async create({
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id
    }: ICreateCarsDTO): Promise<Car> {
        const car = this.repository.create({
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id
        })

        await this.repository.save(car)

        return car
    }
    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = await this.repository.findOne({
            license_plate
        })

        return car
    }

    async findAvailable(
        name?: string,
        brand?: string,
        category_id?: string
    ): Promise<Car[]> {

        const carsQuery = await this.repository
            .createQueryBuilder('c')
            .where('available = :available', { available: true })

        if (name) {
            carsQuery.andWhere('c.name = :name', { name })
        }
        if (brand) {
            carsQuery.andWhere('c.brand = :brand', { brand })
        }
        if (category_id) {
            carsQuery.andWhere('c.category_id = :category_id', { category_id })
        }

        const cars = await carsQuery.getMany()

        return cars
    }
}

export { CarsRepository }
