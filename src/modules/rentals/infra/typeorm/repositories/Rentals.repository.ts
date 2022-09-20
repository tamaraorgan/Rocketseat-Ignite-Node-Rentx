import { getRepository, Repository } from 'typeorm'
import { ICreateRentalDTO } from '../../../dtos/ICreateRental.dto'
import { IRentalsRepository } from '../../../repositories/IRentals.repository'
import { Rental } from '../entities/Rental.model'

class RentalsRepository implements IRentalsRepository {
    private repository: Repository<Rental>

    constructor() {
        this.repository = getRepository(Rental)
    }

    async findOpenRentalByCar(id: string): Promise<Rental> {
        const openByCar = await this.repository.findOne(id)

        return openByCar
    }

    async findOpenRentalByUser(id: string): Promise<Rental> {
        const openByUser = await this.repository.findOne(id)

        return openByUser
    }

    async create({
        user_id,
        car_id,
        expected_return_date
    }: ICreateRentalDTO): Promise<Rental> {
        const rental = this.repository.create({
            user_id,
            car_id,
            expected_return_date
        })

        await this.repository.save(rental)

        return rental
    }
}

export { RentalsRepository }
