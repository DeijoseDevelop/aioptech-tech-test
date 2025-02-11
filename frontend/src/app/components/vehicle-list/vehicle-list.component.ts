import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleService } from '../../services/vehicle.service';
import { Vehicle } from '../../models/vehicle';

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css'],
})
export class VehicleListComponent implements OnInit {
  vehicles$ = this.vehicleService.getVehicles();

  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.vehicleService.fetchVehicles();
  }
}