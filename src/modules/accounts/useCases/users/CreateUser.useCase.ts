import { inject, injectable } from 'tsyringe'
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
import { IUsersRepository } from '../../repositories/users/IUsers.repository'

interface IRequest {
    name: string
    description: string
}

@injectable()
class CreateUserUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) {}

    async execute({
        name,
        username,
        email,
        password,
        driver_license
    }: ICreateUserDTO): Promise<void> {
        // const categoryAlreadyExists =
        //     await this.usersRepository.findByName(name)

        // if (categoryAlreadyExists) {
        //     throw new Error('Category already exists!')
        // }

        await this.usersRepository.create({
            name,
            username,
            email,
            password,
            driver_license
        })
    }
}

export { CreateUserUseCase }
