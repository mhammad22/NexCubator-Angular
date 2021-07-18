import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAllSolvedTicketsService {

  constructor(private http:HttpClient) { }

  GetAllSolvedTickets():Observable<any>{
    let TicektAPI="http://localhost:52497/api/Admin/GetResolvedTickets";
    console.log(TicektAPI);
    return this.http.get<any>(TicektAPI);
}
}
