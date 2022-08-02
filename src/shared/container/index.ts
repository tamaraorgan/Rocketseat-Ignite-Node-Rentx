import { container } from 'tsyringe'

import { CategoriesRepository } from '../../modules/cars/repositories/categories/Categories.repository'
import { SpecificationsRepository } from '../../modules/cars/repositories/specifications/Specifications.repository'

import { ICategoriesRepository } from '../../modules/cars/repositories/categories/ICategories.repository'
import { ISpecificationsRepository } from '../../modules/cars/repositories/specifications/ISpecifications.repository'

import { IUsersRepository } from '../../modules/accounts/repositories/users/IUsers.repository'
import { UsersRepository } from '../../modules/accounts/repositories/users/Users.repository'

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
