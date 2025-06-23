import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { SingletonService } from './singleton.service';

@Injectable({
  providedIn: 'root'
})
export class MejaService {
  constructor(
    private singleton : SingletonService,
    private http : HttpClient
  ) { }

  all(): Observable<any> 
  {
    return this.http.get(this.singleton.apiUrl+"/api/mejas", {
      headers:this.singleton.get_header()
    });
  }
}
