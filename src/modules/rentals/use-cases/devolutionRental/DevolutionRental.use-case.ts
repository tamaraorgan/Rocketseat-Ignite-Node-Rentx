import { inject, injectable } from 'tsyringe'
import { IDateProvider } from '../../../../shared/container/providers/DateProvider/IDate.provider'
import { AppError } from '../../../../shared/errors/App.error'
import { ICarsRepository } from '../../../cars/repositories/ICars.repository'
import { Rental } from '../../infra/typeorm/entities/Rental.model'
import { IRentalsRepository } from '../../repositories/IRentals.repository'

interface IRequest {
    id: string
    user_id: string
}

@injectable()
class DevolutionRentalUseCase {
    constructor(
        @inject('RentalsRepository')
        private rentalsRepository: IRentalsRepository,
        @inject('CarsRepository')
        private carsRepository: ICarsRepository,
        @inject('DayjsDateProvider')
        private dateProvider: IDateProvider
    ) {}
    async execute({ id, user_id }: IRequest): Promise<Rental> {
        const minimum_daily = 1
        let total = 0
        const rental = await this.rentalsRepository.findById(id)
        const car = await this.carsRepository.findById(rental.car_id)

        if (!rental) {
            throw new AppError('Rental does not exists!')
        }

        let daily = this.dateProvider.compareInDays(
            rental.start_date,
            this.dateProvider.dateNow()
        )

        if (daily <= 0) {
            daily = minimum_daily
        }

        const delay = this.dateProvider.compareInDays(
            this.dateProvider.dateNow(),
            rental.expected_return_date
        )

        if(delay > 0) {
            const calculate_fine = delay * car.fine_amount
            total = calculate_fine
        }

        total += daily * car.daily_rate

        rental.end_date = this.dateProvider.dateNow()
        rental.total = total

        await this.rentalsRepository.create(rental)
        await this.carsRepository.updateAvailable(car.id, true)

        return rental
    }
}

export { DevolutionRentalUseCase }
