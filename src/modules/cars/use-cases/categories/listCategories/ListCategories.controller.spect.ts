import request from 'supertest'
import { v4 as uuidV4 } from 'uuid'
import { hash } from 'bcryptjs'

import { app } from '../../../../../shared/http/app'

import createConnection from '../../../../../shared/typeorm/index'
import { Connection } from 'typeorm'

let connection: Connection

describe('Create Category Controller', () => {
    beforeAll(async () => {
        connection = await createConnection()
        await connection.runMigrations()

        const id = uuidV4()
        const password = await hash('admin', 8)

        await connection.query(
            `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
            values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', '123654' )
            `
        )
    })

    afterAll(async () => {
        await connection.dropDatabase()
        await connection.close()
    })

    it('should be able to list all categories', async () => {
        const responseToken = await request(app).post('/sessions').send({
            email: 'admin@rentx.com.br',
            password: 'admin'
        })
        
        const { token } = responseToken.body

        await request(app)
            .post('/categories')
            .send({
                name: 'Category supertest',
                description: 'Description supertest'
            })
            .set({ Authorization: `Bearer ${token}` })
        
        const response = await request(app).get('/categories')

        expect(response.status).toBe(201)
        expect(response.body.length).toBe(1)
        expect(response.body[0]).toHaveProperty("id")
    })
})