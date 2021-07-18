import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExploreStartupInvestorService {
  constructor(private http: HttpClient) {}

  ViewStartup(): Observable<any> {
    let ViewStartupApi = 'http://localhost:52497/api/Investor/ViewStartups';
    console.log(ViewStartupApi);
    return this.http.get<any>(ViewStartupApi);
  }
}
