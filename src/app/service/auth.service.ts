import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

const apiUrl = "http://localhost:8000";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  login(email:string, password:string): Observable<any> 
  {
    return this.http.post(apiUrl+"/api/login", {
      "email" : email,
      'password' :password
    });
  }

  register(username:string, email:string, no_hp:string, password:string): Observable<any>
  {
    return this.http.post(apiUrl+"/api/register", {
      "username" : username,
      "email" : email,
      "no_hp" : no_hp,
      'password' :password
    });
  }
  
}
