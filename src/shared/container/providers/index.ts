import { container } from "tsyringe";
import { DayjsDateProvider } from "./DateProvider/DayjsDate.provider";
import { IDateProvider } from "./DateProvider/IDate.provider";

container.registerSingleton<IDateProvider>(
    "DayjsDateProvider",
    DayjsDateProvider
)