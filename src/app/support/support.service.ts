import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SupportTicket } from '../Models/SupportTicket';

@Injectable({
  providedIn: 'root',
})
export class SupportService {
  baseUrl: string = 'http://localhost:52497';

  constructor(private http: HttpClient) {}

  GetUserId():Observable<any>{
    let userIdUrl=this.baseUrl+"/api/Startup/GetId"
    return this.http.get(userIdUrl).pipe(tap((data:any)=>{
      console.log(data);
    }));
  }

  AddTicketToDB(obj: SupportTicket): Observable<any> {
    let supportLink = this.baseUrl + '/api/Admin/GenerateTicket';

    return this.http.post<any>(supportLink, obj).pipe(
      tap((data: any) => {
        console.log(data);
        sessionStorage.setItem("TicketId",data.TicketId);
      })
    );
  }
}
