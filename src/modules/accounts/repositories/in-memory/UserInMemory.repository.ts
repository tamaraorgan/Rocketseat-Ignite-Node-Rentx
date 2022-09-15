import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'
import { IUsersRepository } from '../IUsers.repository'

import { User } from '../../infra/typeorm/entities/User'


class UserInMemoryRepository implements IUsersRepository {
    users: User[] = []

    async create({
        name,
        email,
        password,
        driver_license
    }: ICreateUserDTO): Promise<void> {
        const user = new User()

        Object.assign(user, {
            name,
            email,
            password,
            driver_license
        })

        this.users.push(user)
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.users.find((user) => user.email === email)
        return user
    }

    async findById(id: string): Promise<User> {
        const user = await this.users.find((user) => user.id === id)
        return user
    }
}

export { UserInMemoryRepository }
