import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vehicle } from '../components/Vehicle/model/Vehicle';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleCRUDService {


 vehicles:Vehicle[];
  constructor(private http:HttpClient) { }

  Url='http://localhost:8080';

  readVehicleALL(): Observable<any>{

    return this.http.get(this.Url + "/readVehicleALL");
  }

  addVehicle(vehicle: Vehicle): Observable<any> {  
    return this.http.post(this.Url + "/addVehicle", vehicle);  
  } 

  getVehicle(id: any): Observable<any>{
    return this.http.get(this.Url + "/getVehicle/" + id); 
  }

  updateVehicle(id: any,vehicle: Vehicle): Observable<any> {  
    return this.http.put(this.Url + "/updateVehicle/" + id , vehicle);  
  }

  deleteVehicle(id: any): Observable<any> {
    return this.http.delete(this.Url + "/deleteVehicle/" + id);  
  }
}
