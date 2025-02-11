import pool from '../models/db';
import { VehicleRepository } from '../repositories/vehicleRepository';
import { Vehiculo, CreateVehiculoInput, QueryResult } from '../types/types';
import { Request, Response } from 'express';

const repository = new VehicleRepository();

export const getAllItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const vehicles = await repository.getAll();
    res.status(200).json(vehicles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los vehículos' });
  }
};
