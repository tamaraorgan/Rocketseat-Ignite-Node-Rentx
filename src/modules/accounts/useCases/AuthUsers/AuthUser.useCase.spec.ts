import { AppError } from '../../../../shared/errors/AppError'
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
import { UserInMemoryRepository } from '../../repositories/in-memory/UserInMemory.repository'
import { CreateUserUseCase } from '../CreateUsers/CreateUser.useCase'
import { AuthUserUseCase } from './AuthUser.useCase'

let authUserUseCase: AuthUserUseCase
let userInMemoryRepository: UserInMemoryRepository
let createUserUseCase: CreateUserUseCase

describe('Authenticate User', () => {
    beforeEach(() => {
        userInMemoryRepository = new UserInMemoryRepository()
        authUserUseCase = new AuthUserUseCase(userInMemoryRepository)
        createUserUseCase = new CreateUserUseCase(userInMemoryRepository)
    })
    it('should be able to authenticate an user', async () => {
        const user: ICreateUserDTO = {
            name: 'Tamara Organ',
            email: 'tamara@organ.com',
            password: '123456789',
            driver_license: '147852369'
        }

        await createUserUseCase.execute(user)

        const result = await authUserUseCase.execute({
            email: user.email,
            password: user.password
        })

        expect(result).toHaveProperty('token')
    })

    it('should not be able to authenticate an none exist user', () => {
        expect(async () => {
            await authUserUseCase.execute({
                email: 'false@email.com',
                password: '12345'
            })
        }).rejects.toBeInstanceOf(AppError)
    })

    it('should not be able to authenticate with incorrect password', () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                name: 'Tamara Organ',
                email: 'tamara@organ.com',
                password: '123456789',
                driver_license: '147852369'
            }

            await createUserUseCase.execute(user)

            await authUserUseCase.execute({
                email: user.email,
                password: '963258741'
            })
        }).rejects.toBeInstanceOf(AppError)
    })
})
