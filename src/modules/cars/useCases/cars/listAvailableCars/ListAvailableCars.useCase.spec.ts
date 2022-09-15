import { CarsInMemoryRepository } from '../../../repositories/in-memory/CarsInMemory.repository'
import { ListAvailableCarsUseCase } from './ListAvailableCars.useCase'

let listAvailableCars: ListAvailableCarsUseCase
let carsInMemoryRepository: CarsInMemoryRepository

describe('List Cars', () => {
    beforeEach(() => {
        carsInMemoryRepository = new CarsInMemoryRepository()
        listAvailableCars = new ListAvailableCarsUseCase(carsInMemoryRepository)
    })

    it('should be able to list all available cars', async () => {
        const car = await carsInMemoryRepository.create({
            name: 'Car 3',
            description: 'Description Car',
            daily_rate: 100,
            license_plate: 'ABC-0000',
            fine_amount: 60,
            brand: 'Brand',
            category_id: 'category_id'
        })
        const cars = await listAvailableCars.execute({})

        expect(cars).toEqual([car])
    })

    it('should be able to list all available cars by brand', async () => {
        const car = await carsInMemoryRepository.create({
            name: 'Car 3',
            description: 'Description Car',
            daily_rate: 100,
            license_plate: 'ABC-0000',
            fine_amount: 60,
            brand: 'Brand_Test',
            category_id: 'category_id'
        })
        const cars = await listAvailableCars.execute({
            brand: 'Brand_Test'
        })

        expect(cars).toEqual([car])
    })

    it('should be able to list all available cars by name', async () => {
        const car = await carsInMemoryRepository.create({
            name: 'Car 3 Teste',
            description: 'Description Car',
            daily_rate: 100,
            license_plate: 'ABC-0000',
            fine_amount: 60,
            brand: 'Brand_Test',
            category_id: 'category_id'
        })
        const cars = await listAvailableCars.execute({
            name: 'Car 3 Teste',
        })

        expect(cars).toEqual([car])
    })

    it('should be able to list all available cars by category_id', async () => {
        const car = await carsInMemoryRepository.create({
            name: 'Car 3',
            description: 'Description Car',
            daily_rate: 100,
            license_plate: 'ABC-0000',
            fine_amount: 60,
            brand: 'Brand_Test',
            category_id: 'category_id_test'
        })
        const cars = await listAvailableCars.execute({
            category_id: 'category_id_test'
        })

        expect(cars).toEqual([car])
    })
})
