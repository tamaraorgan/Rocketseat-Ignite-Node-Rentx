import { inject, injectable } from 'tsyringe'
import { IDateProvider } from '../../../../shared/container/providers/DateProvider/IDate.provider'
import { AppError } from '../../../../shared/errors/App.error'
import { ICarsRepository } from '../../../cars/repositories/ICars.repository'
import { Rental } from '../../infra/typeorm/entities/Rental.model'
import { IRentalsRepository } from '../../repositories/IRentals.repository'

interface IRequest {
    user_id: string
    car_id: string
    expected_return_date: Date
}
@injectable()
class CreateRentalUseCase {
    constructor(
        @inject('RentalsRepository')
        private rentalsRepository: IRentalsRepository,
        @inject('DayjsDateProvider')
        private dateProvider: IDateProvider,
        @inject('CarsRepository')
        private carsRepository: ICarsRepository
    ) {}
    async execute({
        user_id,
        car_id,
        expected_return_date
    }: IRequest): Promise<Rental> {
        const minimumHour = 24
        const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id)
        const rentalOpenToUser =
            await this.rentalsRepository.findOpenRentalByUser(user_id)

        const compare = this.dateProvider.compareInHours(
            this.dateProvider.dateNow(),
            expected_return_date
        )

        if (carUnavailable) {
            throw new AppError('Car is unavailable!')
        }

        if (rentalOpenToUser) {
            throw new AppError("There's a rental is progress for user!")
        }

        if (compare < minimumHour) {
            throw new AppError('Invalid return time!')
        }

        const rental = await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date
        })

        await this.carsRepository.updateAvailable(car_id, false)

        return rental
    }
}

export { CreateRentalUseCase }
