import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonCrudService {

  constructor(private http:HttpClient) { }

  Url='http://localhost:8080/autossanchezDES-1.0/common';


  //Municipios y Provincias
  getMunicipalityList(): Observable<any>{
    return this.http.get(this.Url + "/getMunicipalityList");
  }
  getMunicipality(id: number): Observable<any>{
    return this.http.get(this.Url + "/getMunicipality/" + id);
  }
  getMunicipalityProvince(id: number): Observable<any>{
    return this.http.get(this.Url + "/getMunicipalityProvince/" + id);
  }
  getProvinceList(): Observable<any>{
    return this.http.get(this.Url + "/getProvinceList");
  }
  getProvince(): Observable<any>{
    return this.http.get(this.Url + "/getProvince");
  }
  

  //Fotos de Vehiculos
  getPhotoList(): Observable<any>{
    return this.http.get(this.Url + "/getPhotoList");
  }
  getPhoto(): Observable<any>{
    return this.http.get(this.Url + "/getPhoto");
  }

}
