import { inject, injectable } from 'tsyringe'
import { hash } from 'bcryptjs'


import { ICreateUserDTO } from '../../dtos/ICreateUser.dto'
import { AppError } from '../../../../shared/errors/App.error'
import { IUsersRepository } from '../../repositories/IUsers.repository'

@injectable()
class CreateUserUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) {}

    async execute({
        name,
        email,
        password,
        driver_license
    }: ICreateUserDTO): Promise<void> {
        const passwordHash = await hash(password, 8)

        const userAlreadyExists = await this.usersRepository.findByEmail(email)

        if (userAlreadyExists) {
            throw new AppError('User already exists!')
        }

        await this.usersRepository.create({
            name,
            email,
            password: passwordHash,
            driver_license
        })
    }
}

export { CreateUserUseCase }
