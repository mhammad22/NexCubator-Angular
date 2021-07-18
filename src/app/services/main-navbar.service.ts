import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MainNavbarService {
  constructor(private http: HttpClient) {}

  //View user profile
  ViewUserProfile(): Observable<any> {
    let ViewUserProfileApi =
      'http://localhost:52497/api/Startup/ViewUserProfile';
    console.log(ViewUserProfileApi);
    return this.http.get<any>(ViewUserProfileApi);
  }
}
