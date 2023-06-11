import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  url="http://localhost:3000";
  constructor(private http:HttpClient) { }
  createNewUser(body:any){
    console.log(body);    
    return this.http.post(this.url+'/newuser',body)
  }
  updatIsverified(token:any){
    console.log("service      :"+token);    
    return this.http.put(this.url+'/updateIsverified',{token:token})
  }
}

