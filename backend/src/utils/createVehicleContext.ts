export const createVehicleContext = (vehicles: any[]): string => {
    let context = '';
    vehicles.forEach((vehicle, index) => {
        context += `
        Vehículo ${index + 1}:
        - Placa: ${vehicle.placa}
        - Marca: ${vehicle.marca}
        - Modelo: ${vehicle.modelo}
        - Serie: ${vehicle.serie}
        - Color: ${vehicle.color}
      `;
    });
    return context;
};