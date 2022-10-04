import { ICreateRentalDTO } from '../../dtos/ICreateRental.dto'
import { Rental } from '../../infra/typeorm/entities/Rental.model'
import { IRentalsRepository } from '../IRentals.repository'

class RentalsInMemoryRepository implements IRentalsRepository {
    rentals: Rental[] = []

    async create({
        user_id,
        car_id,
        expected_return_date
    }: ICreateRentalDTO): Promise<Rental> {
        const rental = new Rental()

        Object.assign(rental, {
            user_id,
            car_id,
            expected_return_date,
            start_date: new Date()
        })
        await this.rentals.push(rental)

        return rental
    }

    async findOpenRentalByCar(id: string): Promise<Rental> {
        return this.rentals.find(
            (rental) => rental.car_id === id && !rental.end_date
        )
    }
    async findOpenRentalByUser(id: string): Promise<Rental> {
        return this.rentals.find(
            (rental) => rental.user_id === id && !rental.end_date
        )
    }

    async findById(id: string): Promise<Rental> {
        return this.rentals.find((rental) => rental.id === id)
    }
}

export { RentalsInMemoryRepository }
