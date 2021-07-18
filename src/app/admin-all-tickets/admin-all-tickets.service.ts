import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAllTicketsService {

  constructor(private http:HttpClient) { }

  GetAllTickets():Observable<any>{
    let TicektAPI="http://localhost:52497/api/Admin/GetUnresolvedTickets";
    console.log(TicektAPI);
    return this.http.get<any>(TicektAPI);
}

ResolveTicket(id):Observable<any>{
  let TicektResolveAPI="http://localhost:52497/api/Admin/ResolveTicket/"+id;
  console.log(TicektResolveAPI);
  return this.http.get<any>(TicektResolveAPI);
}





}
