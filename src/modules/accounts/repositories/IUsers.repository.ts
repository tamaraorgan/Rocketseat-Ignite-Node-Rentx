import { ICreateUserDTO } from "../dtos/ICreateUser.dto"
import { User } from "../infra/typeorm/entities/User.model"


interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<void>
    findByEmail(email: string): Promise<User>
    findById(id: string): Promise<User>
    // list(): Promise<User[]>
}

export { IUsersRepository }
