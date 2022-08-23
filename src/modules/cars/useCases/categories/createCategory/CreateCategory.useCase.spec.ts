import { AppError } from '../../../../../shared/errors/AppError'
import { CategoriesInMemoryRepository } from '../../../repositories/in-memory/CategoriesInMemory.repository'
import { CreateCategoryUseCase } from './CreateCategory.useCase'

let createCategoryUseCase: CreateCategoryUseCase
let categoriesInMemoryRepository: CategoriesInMemoryRepository

describe('Create Category', () => {
    beforeEach(() => {
        categoriesInMemoryRepository = new CategoriesInMemoryRepository()
        createCategoryUseCase = new CreateCategoryUseCase(
            categoriesInMemoryRepository
        )
    })

    it('should be able to create a new category', async () => {
        const category = {
            name: 'Category Test',
            description: 'Category description Test'
        }
        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description
        })

        const categoryCreated = await categoriesInMemoryRepository.findByName(
            category.name
        )

        expect(categoryCreated).toHaveProperty('id')
    })

    it('should not be able to create a new category with name exists', () => {
        expect(async () => {
            const category = {
                name: 'Category Test',
                description: 'Category description Test'
            }
            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description
            })

            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description
            })
        }).rejects.toBeInstanceOf(AppError)
    })
})
