import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/User';
import { FilterUser } from '../interfaces/filter-user';

@Injectable({
  providedIn: 'root'
})
export class UserCrudService {

  user:User[];
  constructor(private http:HttpClient) { }

  Url='http://localhost:8080/user';

  getUserList(): Observable<any>{

    return this.http.get(this.Url + "/getUserList");
  }

  // Añade un Usuario
  public addUser(user: User): Observable<any> {  
    return this.http.post(this.Url + "/addUser", user);  
  }
  getUserId(id: number): Observable<any>{
    return this.http.get(this.Url + "/" + id); 
  }
 
  getUserDni(dni: string): Observable<any>{
    return this.http.get(this.Url + "/details/" + dni); 
  }

  updateUser(id: number,user: User): Observable<any> {  
    return this.http.put(this.Url + "/updateUser/" + id , user);  
  }
  
  deleteUser(id: number): Observable<any> {
    return this.http.delete(this.Url + "/deleteUser/" + id);  
  }

  reactivateUser(id: number): Observable<any> {
    return this.http.delete(this.Url + "/reactivateUser/" + id);  
  }
  getClient(filter: string): Observable<any> { 
    return this.http.get(this.Url + `/details/${filter}`);
  }
  // Busca por filtro un Usuario
  getListUserByFilter(filter: FilterUser): Observable<any> {
    return this.http.post(this.Url + "/search/", filter);  
  }
}