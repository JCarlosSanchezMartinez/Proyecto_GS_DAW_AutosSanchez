import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FilterVehicle } from '../interfaces/filter-vehicle.interface';
import { PhotoVehicle } from '../model/PhotoVehicle';
import { SearchVehicleDto } from '../model/search-vehicle-dto';

@Injectable({
  providedIn: 'root'
})
export class SearchVehicleDtoService {

  vehiclesDto:SearchVehicleDto[];
  constructor(private http:HttpClient) { }

  Url='http://localhost:8080/search/';


// Devuelve todos los vehiculos
  readVehicleALL(): Observable<any>{
    return this.http.get<SearchVehicleDto[]>(this.Url + "getVehicleListDto");
   
  }
// Devuelve el Vehiculo por su ID
  getVehicle(id: any): Observable<any>{
    return this.http.get(this.Url + id); 
  }
  // Devuelve el Vehiculo por su ID
  getVehicleCarrousel(): Observable<any>{
    return this.http.get(this.Url + "carrouselDto/"); 
  }
// Busca por filtro un Vehiculo
  getListVehicleByFilter(filter: FilterVehicle): Observable<any> {
    return this.http.post(this.Url + "search", filter);  
  }
// Busca las imagenes de un Vehiculo
readVehicleImagenList(id: any): Observable<any>{
  return this.http.get<PhotoVehicle[]>(this.Url + "getVehicleImagenList" + id);
 
}
 
}
