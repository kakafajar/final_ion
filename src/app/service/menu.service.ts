import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { SingletonService } from './singleton.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private http = inject(HttpClient);

  constructor(private singleton : SingletonService) { }

  all(): Observable<any> 
  {
    return this.http.get(this.singleton.apiUrl+"/api/menus",
      {headers:this.singleton.get_header()}
    );
  }
}
