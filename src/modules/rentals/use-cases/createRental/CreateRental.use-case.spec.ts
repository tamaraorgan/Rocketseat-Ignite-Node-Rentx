import dayjs from 'dayjs'
import { DayjsDateProvider } from '../../../../shared/container/providers/DateProvider/DayjsDate.provider'
import { AppError } from '../../../../shared/errors/App.error'
import { CarsInMemoryRepository } from '../../../cars/repositories/in-memory/Cars.in-memory.repository'
import { RentalsInMemoryRepository } from '../../repositories/in-memory/RentalsInMemory.repository'
import { CreateRentalUseCase } from './CreateRental.use-case'

let createRentalUseCase: CreateRentalUseCase
let rentalsInMemoryRepository: RentalsInMemoryRepository
let carsInMemoryRepository: CarsInMemoryRepository
let dayjsDateProvider: DayjsDateProvider

describe('Create Rental', () => {
    const dayAddOneDay = dayjs().add(1, 'day').toDate()
    beforeEach(() => {
        rentalsInMemoryRepository = new RentalsInMemoryRepository()
        carsInMemoryRepository = new CarsInMemoryRepository()
        dayjsDateProvider = new DayjsDateProvider()
        createRentalUseCase = new CreateRentalUseCase(
            rentalsInMemoryRepository,
            dayjsDateProvider,
            carsInMemoryRepository
        )
    })

    it('should be able to create a new rental', async () => {
        const rental = await createRentalUseCase.execute({
            user_id: '123456',
            car_id: '121212',
            expected_return_date: dayAddOneDay
        })

        expect(rental).toHaveProperty('id')
        expect(rental).toHaveProperty('start_date')
    })

    it('should not be able to create a new rental if there is another open to the same user', async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: '123456',
                car_id: '121212',
                expected_return_date: dayAddOneDay
            })
            await createRentalUseCase.execute({
                user_id: '123456',
                car_id: '121212',
                expected_return_date: dayAddOneDay
            })
        }).rejects.toBeInstanceOf(AppError)
    })

    it('should not be able to create a new rental if there is another open to the same car', async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: '123456',
                car_id: '121212',
                expected_return_date: dayAddOneDay
            })
            await createRentalUseCase.execute({
                user_id: '654123',
                car_id: '121212',
                expected_return_date: dayAddOneDay
            })
        }).rejects.toBeInstanceOf(AppError)
    })

    it('should not be able to create a new rental with invalid return time', async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: '123456',
                car_id: '121212',
                expected_return_date: dayjs().toDate()
            })
        }).rejects.toBeInstanceOf(AppError)
    })
})
