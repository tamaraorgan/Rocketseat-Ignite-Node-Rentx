import { container } from 'tsyringe'

import { ICategoriesRepository } from '../../modules/cars/repositories/implementations/categories/ICategories.repository'
import { CategoriesRepository } from '../../modules/cars/infra/typeorm/repositories/Categories.repository'

import { ISpecificationsRepository } from '../../modules/cars/repositories/implementations/specifications/ISpecifications.repository'
import { SpecificationsRepository } from '../../modules/cars/infra/typeorm/repositories/Specifications.repository'

import { IUsersRepository } from '../../modules/accounts/repositories/implementations/users/IUsers.repository'
import { UsersRepository } from '../../modules/accounts/infra/typeorm/repositories/Users.repository'

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
