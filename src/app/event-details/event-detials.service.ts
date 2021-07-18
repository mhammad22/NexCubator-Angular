import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Events } from '../Models/Events';

@Injectable({
  providedIn: 'root',
})
export class EventDetialsService {
  baseUrl: string = 'http://localhost:52497';

  constructor(private http: HttpClient) {}

  getEvents(): Observable<any> {
    let ApiUrl = this.baseUrl + '/api/Events/GetEvent';

    return this.http.get(ApiUrl).pipe(
      tap((data: Events[]) => {
        //console.log(data);
      })
    );
  }

  //Delete Event API Link missing
  DeleteEvent(eventobj:number):Observable<any>{
    let ApiUrl = this.baseUrl + '/api/Events/GetEvent';

    return this.http.delete(ApiUrl).pipe(
      tap((data: Events[]) => {
        //console.log(data);
      })
    ); 
  }


}
