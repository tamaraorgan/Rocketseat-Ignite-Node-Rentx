import fs from 'fs'
import { parse } from 'csv-parse'
import { inject, injectable } from 'tsyringe'

import { CategoriesRepository } from '../../../infra/typeorm/repositories/Categories.repository'

interface IImportCategory {
    name: string
    description: string
}

@injectable()
class ImportCategoryUseCase {
    constructor(
        @inject('CategoriesRepository')
        private categoriesRepository: CategoriesRepository
    ) {}

    loadCategories(file): Promise<IImportCategory[]> {
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(file.path)
            const categories: IImportCategory[] = []

            const parseFile = parse()

            stream.pipe(parseFile)

            parseFile
                .on('data', async (line) => {
                    const [name, description] = line
                    categories.push({
                        name,
                        description
                    })
                })
                .on('end', () => {
                    fs.promises.unlink(file.path)
                    resolve(categories)
                })
                .on('error', (err) => {
                    reject(err)
                })
        })
    }

    async execute(file: any): Promise<void> {
        const categories = await this.loadCategories(file)

        categories.map(async (category) => {
            const { name, description } = category

            const existCategory = await this.categoriesRepository.findByName(
                name
            )

            if (!existCategory) {
                await this.categoriesRepository.create({
                    name,
                    description
                })
            }
        })
    }
}
export { ImportCategoryUseCase }
