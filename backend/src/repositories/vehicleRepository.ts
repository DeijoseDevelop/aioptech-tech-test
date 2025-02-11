import { IVehicleRepository } from "../interfaces/vehicleRepositoryInterface";
import pool from "../models/db";
import { QueryResult, Vehiculo } from "../types/types";

export class VehicleRepository implements IVehicleRepository {
    async getAll(): Promise<Vehiculo[]> {
        const [rows]: [any, any] = await pool.query('SELECT * FROM vehiculos');
        const vehicles = rows as Vehiculo[];

        return vehicles;
    };
}