import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PhotoVehicle } from '../model/PhotoVehicle';

@Injectable({
  providedIn: 'root'
})
export class PhotoVehicleService {

  Url='http://localhost:8080/autossanchezDES-1.0/photoVehicle/';

  constructor(private http:HttpClient) { }

  // Busca las imagenes de un Vehiculo
  getVehicleImagenList(id: any): Observable<any>{
    return this.http.get<PhotoVehicle[]>(this.Url + "getVehicleImagenList/" + id);
   
  }
  // Añade un PhotoVehicle
  addPhotoVehicle(photoVehicle:  PhotoVehicle[]): Observable<any> {  
    return this.http.post(this.Url + "addPhotoVehicle" , photoVehicle);  
  }
    // Elimina un PhotoVehicle
    deleteePhotoVehicle(id: number): Observable<any> {  
      return this.http.delete(this.Url + "deletePhotoVehicle/" + id);  
    }  
}


