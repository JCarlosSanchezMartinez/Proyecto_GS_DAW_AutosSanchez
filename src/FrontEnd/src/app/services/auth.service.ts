import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtDTO } from '../model/jwt-dto';
import { LoginUser } from '../model/login-user';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authURL='http://localhost:8080/auth';

  constructor(private http:HttpClient) { }


  // Añade un Usuario
  public addUser(user: User): Observable<any> {  
    return this.http.post(this.authURL + "/addUser", user);  
  }



  // Login Usuario
  public login(loginUser: LoginUser): Observable<JwtDTO> {  
    return this.http.post<JwtDTO>(this.authURL + "/login", loginUser);  
  } 
}


