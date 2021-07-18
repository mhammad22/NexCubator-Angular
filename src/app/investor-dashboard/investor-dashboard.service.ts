import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvestorDashboardService {

  constructor(private http:HttpClient) { }

  ViewUserProfile(): Observable<any> {
    let ViewUserProfileApi =
      'http://localhost:52497/api/Investor/ViewUserProfile';
    console.log(ViewUserProfileApi);
    return this.http.get<any>(ViewUserProfileApi);
  }
}
