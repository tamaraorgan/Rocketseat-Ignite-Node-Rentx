import { ICreateRentalDTO } from '../dtos/ICreateRental.dto'
import { Rental } from '../infra/typeorm/entities/Rental.model'

interface IRentalsRepository {
    findOpenRentalByCar(id: string): Promise<Rental>
    findOpenRentalByUser(id: string): Promise<Rental>
    create(data: ICreateRentalDTO): Promise<Rental>
}

export { IRentalsRepository }
