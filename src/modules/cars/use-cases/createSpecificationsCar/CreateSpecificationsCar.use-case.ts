import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../../shared/errors/App.error'
import { Car } from '../../infra/typeorm/entities/car.model'
import { ICarsRepository } from '../../repositories/ICars.repository'
import { ISpecificationsRepository } from '../../repositories/ISpecifications.repository'

interface IRequest {
    car_id: string
    specifications_id: string[]
}

@injectable()
class CreateSpecificationCarUseCase {
    constructor(
        @inject('CarsRepository')
        private carsRepository: ICarsRepository,

        @inject('SpecificationsRepository')
        private specificationRepository: ISpecificationsRepository
    ) {}
    async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
        const carExistis = await this.carsRepository.findById(car_id)

        if (!carExistis) {
            throw new AppError('Car does not existis!')
        }

        const specifications = await this.specificationRepository.findByIds(
            specifications_id
        )

        carExistis.specifications = specifications

        await this.carsRepository.create(carExistis)

        return carExistis
    }
}

export { CreateSpecificationCarUseCase }
