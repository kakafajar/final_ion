import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { SingletonService } from './singleton.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  constructor(private singleton: SingletonService){}

  login(email:string, password:string): Observable<any> 
  {
    return this.http.post(this.singleton.apiUrl+"/api/login", {
      "email" : email,
      'password' :password
    });
  }

  register(username:string, email:string, no_hp:string, password:string): Observable<any>
  {
    return this.http.post(this.singleton.apiUrl+"/api/register", {
      "username" : username,
      "email" : email,
      "no_hp" : no_hp,
      'password' :password
    });
  }

  logout()
  {
    return this.http.post(this.singleton.apiUrl+"/api/logout",{}, {
      headers : this.singleton.get_header()});
  }
  
}
