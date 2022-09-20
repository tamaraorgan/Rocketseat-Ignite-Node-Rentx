import { inject, injectable } from 'tsyringe'
import { IDateProvider } from '../../../shared/container/providers/DateProvider/IDate.provider'
import { AppError } from '../../../shared/errors/App.error'
import { Rental } from '../infra/typeorm/entities/Rental.model'
import { IRentalsRepository } from '../repositories/IRentals.repository'

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
        private dateProvider: IDateProvider
    ) {}
    async execute({
        user_id,
        car_id,
        expected_return_date
    }: IRequest): Promise<Rental> {
        const minimumHour = 24
        const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
            car_id
        )
        const rentalOpenToUser =
            await this.rentalsRepository.findOpenRentalByUser(user_id)

        const compare = this.dateProvider.compareInHours(
            expected_return_date,
            this.dateProvider.dateNow()
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

        return rental
    }
}

export { CreateRentalUseCase }
