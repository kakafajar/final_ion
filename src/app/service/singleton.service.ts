import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SingletonService {
    public apiUrl = "http://localhost:8000";

    public get_header(){
        return new HttpHeaders({
            "Authorization" : "Bearer " + localStorage.getItem("token")
        });  
    }
}