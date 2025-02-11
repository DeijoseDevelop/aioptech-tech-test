export interface Vehiculo {
    placa: string;
    marca: string;
    modelo: string;
    serie: string;
    color: string;
  }
  
  export type CreateVehiculoInput = Pick<Vehiculo, 'placa' | 'marca' | 'modelo' | 'serie' | 'color'>;
  
  export interface QueryResult {
    affectedRows: number;
    insertId?: number;
  }