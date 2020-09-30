import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/User';

@Injectable({
  providedIn: 'root'
})
export class UserCrudService {

  user:User[];
  constructor(private http:HttpClient) { }

  Url='http://localhost:8080';

  readUserALL(): Observable<any>{

    return this.http.get(this.Url + "/readUserALL");
  }

  addUser(user: User): Observable<any> {  
    return this.http.post(this.Url + "/addUser", user);  
  } 

  getUser(id: any): Observable<any>{
    return this.http.get(this.Url + "/getUser/" + id); 
  }

  updateUser(id: any,user: User): Observable<any> {  
    return this.http.put(this.Url + "/updateUser/" + id , user);  
  }

  deleteUser(id: any): Observable<any> {
    return this.http.delete(this.Url + "/deleteUser/" + id);  
  }
}