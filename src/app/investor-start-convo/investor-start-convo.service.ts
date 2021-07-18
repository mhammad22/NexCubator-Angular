import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Message } from '../Models/Message';

@Injectable({
  providedIn: 'root'
})
export class InvestorStartConvoService {

  baseUrl:string="http://localhost:52497";

  constructor(private http:HttpClient) { }

  initateConvo(data:Message):Observable<any>{
    let newApi=this.baseUrl+"/api/Message/InitateConvo";
    console.log("NewApi: ", newApi);
    return this.http.post(newApi,data).pipe(tap((data:any)=>{
      console.log(data);
    }))
  }

  getPitch(id:string):Observable<any>{
    let newApi=this.baseUrl+"/api/Startup/GetPitch/"+id;
    console.log(newApi);

    return this.http.get(newApi).pipe(tap((data:any)=>{
      console.log(data);
    }))
  }
}
