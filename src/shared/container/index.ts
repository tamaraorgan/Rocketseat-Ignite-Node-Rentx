import { container } from 'tsyringe'

import { ICategoriesRepository } from '../../modules/cars/repositories/ICategories.repository'
import { CategoriesRepository } from '../../modules/cars/infra/typeorm/repositories/Categories.repository'

import { ISpecificationsRepository } from '../../modules/cars/repositories/ISpecifications.repository'
import { SpecificationsRepository } from '../../modules/cars/infra/typeorm/repositories/Specifications.repository'

import { IUsersRepository } from '../../modules/accounts/repositories/IUsers.repository'
import { UsersRepository } from '../../modules/accounts/infra/typeorm/repositories/Users.repository'

import { ICarsRepository } from '../../modules/cars/repositories/ICars.repository'
import { CarsRepository } from '../../modules/cars/infra/typeorm/repositories/Cars.repository'
import { IImagesCarRepository } from '../../modules/cars/repositories/IImagesCar.repository'
import { ImagesCarRepository } from '../../modules/cars/infra/typeorm/repositories/ImagesCar.repository'

container.registerSingleton<ICategoriesRepository>(
    'CategoriesRepository',
    CategoriesRepository
)

container.registerSingleton<ISpecificationsRepository>(
    'SpecificationsRepository',
    SpecificationsRepository
)

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository
)

container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository)

container.registerSingleton<IImagesCarRepository>(
    'ImagesCarRepository',
    ImagesCarRepository
)
