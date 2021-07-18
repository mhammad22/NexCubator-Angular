import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Events } from '../Models/Events';

@Injectable({
  providedIn: 'root'
})
export class AddEventFormService {

  baseUrl:string="http://localhost:52497";

  constructor(private http:HttpClient) { }

  AddEvent(event:Events):Observable<any>{
    let ApiUrl=this.baseUrl+"/api/Events/PostEvent";
    console.log("Create Event Api:", ApiUrl);
    return this.http.post(ApiUrl,event).pipe(tap((data:any)=>{
      console.log(data);
    }));
  }

//EDit Event Link to be updated
  EditEvent(event:Events):Observable<any>{
    let ApiUrl=this.baseUrl+"/api/Events/PostEvent";
    console.log("Create Event Api:", ApiUrl);
    return this.http.put(ApiUrl,event).pipe(tap((data:any)=>{
      console.log(data);
    }));
  }


  getEvents(): Observable<any> {
    let ApiUrl = this.baseUrl + '/api/Events/GetEvent';

    return this.http.get(ApiUrl).pipe(
      tap((data: Events[]) => {
        //console.log(data);
      })
    );
  }
}
