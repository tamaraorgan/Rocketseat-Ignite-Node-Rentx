import { AppError } from "../../../../../shared/errors/App.error"
import { CarsInMemoryRepository } from "../../../repositories/in-memory/Cars.in-memory.repository"
import { CreateCarUseCase } from "./CreateCar.use-case"


let createCarUseCase: CreateCarUseCase 
let carsInMemoryRepository: CarsInMemoryRepository

describe("Create Car", () => {
    beforeEach(() => {
        carsInMemoryRepository = new CarsInMemoryRepository()
        createCarUseCase = new CreateCarUseCase(carsInMemoryRepository)
    })

    it("should be able to create a new car", async () => {
        const car = await createCarUseCase.execute({
            name: "Name Car",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABC-0000",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category"
        })

        expect(car).toHaveProperty("id")
    })

    it("should not be able to create a car with exists license plate", () => {
        expect(async () => {
            await createCarUseCase.execute({
                name: "Car 1",
                description: "Description Car",
                daily_rate: 100,
                license_plate: "ABC-0000",
                fine_amount: 60,
                brand: "Brand",
                category_id: "category"
            })

            await createCarUseCase.execute({
                name: "Car 2",
                description: "Description Car",
                daily_rate: 100,
                license_plate: "ABC-0000",
                fine_amount: 60,
                brand: "Brand",
                category_id: "category"
            })
        }).rejects.toBeInstanceOf(AppError)
    })

    it("should not be able to create a car with available true by default", async () => {
        const car  = await createCarUseCase.execute({
            name: "Car Available",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABC-1111",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category"
        })

        expect(car.available).toBe(true)
    })
})