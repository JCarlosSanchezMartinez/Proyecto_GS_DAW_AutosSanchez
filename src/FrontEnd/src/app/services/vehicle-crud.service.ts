import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vehicle } from '../model/Vehicle';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleCRUDService {


 vehicles:Vehicle[];
  constructor(private http:HttpClient) { }

  Url='http://localhost:8080/vehicle/';


// Devuelve todos los vehiculos
  readVehicleALL(): Observable<any>{
    return this.http.get<Vehicle[]>(this.Url + "getVehicleList");
   
  }
// Devuelve el Vehiculo por su ID
  getVehicle(id: any): Observable<any>{
    return this.http.get(this.Url + id); 
  }
  // Devuelve el Vehiculo por su ID
  getVehicleCarrousel(): Observable<any>{
    return this.http.get(this.Url + "carrosuel/"); 
  }
// Devuelve un Vehiculo por su NUMBER_PLATE
  getVehicleNumberPlate(number_plate: string): Observable<any>{
    return this.http.get(this.Url + "details/" + number_plate); 
  }
// Devuelve un Vehiculos por su USER_ID
  getVehicleForUserId(id: number): Observable<any>{
    return this.http.get(this.Url + "vehicle/" + id); 
  }
// Añade un Vehiculo
  addVehicle(vehicle: Vehicle): Observable<any> {  
    return this.http.post(this.Url + "addVehicle", vehicle);  
  }  
// Modifica un Vehiculo
  updateVehicle(id: any,vehicle: Vehicle): Observable<any> {  
    return this.http.put(this.Url + "updateVehicle/" + id , vehicle);  
  }
// Borra un Vehiculo
  deleteVehicle(id: any): Observable<any> {
    return this.http.delete(this.Url + "deleteVehicle/" + id);  
  }
// Borra un Vehiculo
  reactivateVehicle(id: number): Observable<any> {
    return this.http.delete(this.Url + "reactivateVehicle/" + id);  
  }
}
