import { AppError } from '../../../../shared/errors/AppError'
import { CarsInMemoryRepository } from '../../repositories/in-memory/CarsInMemory.repository'
import { SpecificationInMemoryRepository } from '../../repositories/in-memory/SpecificationInMemory.repository'
import { CreateSpecificationCarUseCase } from './CreateSpecificationsCar.useCase'

let createSpecificationCarUseCase: CreateSpecificationCarUseCase
let carsInMemoryRepository: CarsInMemoryRepository
let specificationInMemoryRepository: SpecificationInMemoryRepository

describe('Create Specification Car', () => {
    beforeEach(() => {
        specificationInMemoryRepository = new SpecificationInMemoryRepository()
        carsInMemoryRepository = new CarsInMemoryRepository()
        createSpecificationCarUseCase = new CreateSpecificationCarUseCase(
            carsInMemoryRepository,
            specificationInMemoryRepository
        )
    })

    it('should not be able a new specification to a now-existent car', async () => {
        expect(async () => {
            const car_id = '123456'
            const specifications_id = ['456321']

            await createSpecificationCarUseCase.execute({
                car_id,
                specifications_id
            })
        }).rejects.toBeInstanceOf(AppError)
    })

    it('should be able to add a new specification to the car', async () => {
        const car = await carsInMemoryRepository.create({
            name: 'Car 1',
            description: 'Description Car',
            daily_rate: 100,
            license_plate: 'ABC-0000',
            fine_amount: 60,
            brand: 'Brand',
            category_id: 'category'
        })

        const specification = await specificationInMemoryRepository.create({
            name: 'specification teste',
            description: 'description'
        })

        const specifications_id = [specification.id]

        const specificationsCar = await createSpecificationCarUseCase.execute({
            car_id: car.id,
            specifications_id
        })

        expect(specificationsCar).toHaveProperty("specifications")
        expect(specificationsCar.specifications.length).toBe(1)
    })
})
