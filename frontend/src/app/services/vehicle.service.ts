import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Vehicle } from '../models/vehicle';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private vehicles = new BehaviorSubject<Vehicle[]>([]);
  private apiUrl = environment.apiUrl;
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) {}

  fetchVehicles(): void {
    const headers = new HttpHeaders({
      'x-api-key': String(this.apiKey!),
    });

    this.http.get<Vehicle[]>(`${this.apiUrl}/vehicles`, { headers }).subscribe({
      next: (data) => {
        this.vehicles.next(data);
      },
      error: (err) => {
        console.error('Error al obtener los vehículos:', err);
      },
    });
  }

  getVehicles(): Observable<Vehicle[]> {
    return this.vehicles.asObservable();
  }

  findVehicleByPlaca(placa: string): Vehicle | undefined {
    return this.vehicles.getValue().find((v) => v.placa === placa);
  }
}