import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CreateVehicle, Vehicle } from '../interface/vehicle.interface';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const { apiBase } = environment;

const GET_VEHICLES = `${apiBase}/vehicles`;
const GET_VEHICLE = `${apiBase}/vehicles/{id}`;
const CREATE_VEHICLE = `${apiBase}/vehicles`;
const UPDATE_VEHICLE = `${apiBase}/vehicles/{id}`;
const DELETE_VEHICLE = `${apiBase}/vehicles/{id}`;


@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient,) {}

  getVehicles() {
    return lastValueFrom(this.http.get<Vehicle[]>(GET_VEHICLES));
  }

  getVehicle(id: number) {
    return lastValueFrom(this.http.get<Vehicle>(GET_VEHICLE.replace('{id}', id.toString())));
  }

  createVehicle(vehicle: CreateVehicle) {
    return lastValueFrom(this.http.post<Vehicle>(CREATE_VEHICLE, vehicle));
  }

  updateVehicle(id: number, vehicle: Partial<Vehicle>) {
    return lastValueFrom(this.http.put<Vehicle>(UPDATE_VEHICLE.replace('{id}', id.toString()), vehicle));
  }

  deleteVehicle(id: number) {
    return lastValueFrom(this.http.delete(DELETE_VEHICLE.replace('{id}', id.toString())));
  }
}
