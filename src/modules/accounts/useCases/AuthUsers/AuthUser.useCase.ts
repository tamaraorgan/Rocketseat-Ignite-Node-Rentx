import { inject, injectable } from 'tsyringe'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'


import { AppError } from '../../../../shared/errors/AppError'
import { IUsersRepository } from '../../repositories/IUsers.repository'

interface IRequest {
    email: string
    password: string
}

interface IResponse {
    user: {
        name: string
        email: string
    }
    token: string
}
@injectable()
class AuthUserUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) {}

    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email)

        if (!user) {
            throw new AppError('Email or password incorrect!')
        }

        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch) {
            throw new AppError('Email or password incorrect!')
        }

        const token = sign({}, 'cea0476c93b43666bc15bec0c29eb57e', {
            subject: user.id,
            expiresIn: '1d'
        })

        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email
            }
        }

        return tokenReturn
    }
}

export { AuthUserUseCase }
