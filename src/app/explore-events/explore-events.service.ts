import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Events } from '../Models/Events';

@Injectable({
  providedIn: 'root'
})
export class ExploreEventsService {

  baseUrl:string="http://localhost:52497";

  constructor(private http:HttpClient) { }

  getEvents():Observable<any>{
    let ApiUrl=this.baseUrl+"/api/Events/GetEvent";

    return this.http.get(ApiUrl).pipe(tap((data:Events[])=>{
      //console.log(data);
    }))
  }
}
