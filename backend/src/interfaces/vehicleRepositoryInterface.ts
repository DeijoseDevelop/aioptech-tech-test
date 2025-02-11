import { Vehiculo } from "../types/types";

export interface IVehicleRepository {
    getAll(): Promise<Vehiculo[]>;
}