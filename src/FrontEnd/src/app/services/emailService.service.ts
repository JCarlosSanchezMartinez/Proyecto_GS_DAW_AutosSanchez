import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmailDetails } from '../model/email-details';

@Injectable({
  providedIn: 'root'
})
export class EmailSendService {

  public emailDetails: EmailDetails

  constructor(private http:HttpClient) { }

  Url='http://localhost:8080/autossanchezDES-1.0/email/';

  // Devuelve todos los vehiculos
  getdetails(emailDetails:EmailDetails):Observable<EmailDetails>{
    return this.http.post(this.Url + "getdetails" ,emailDetails);
   
  }
}
