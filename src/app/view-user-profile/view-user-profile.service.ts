import { UserProfile } from './../Models/UserProfile';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ViewUserProfileService {
  constructor(private http: HttpClient) {}

  //ViewUSerProfile
  //View user profile
  ViewUserProfile(): Observable<any> {
    let ViewUserProfileApi =
      'http://localhost:52497/api/Startup/ViewUserProfile';
    console.log(ViewUserProfileApi);
    return this.http.get<any>(ViewUserProfileApi);
  }

  //Edit User  --- Link update
  EditUserProfile(Update: UserProfile): Observable<any> {
    let ViewUserProfileApi =
      'http://localhost:52497/api/Startup/ViewUserProfile';
    console.log(ViewUserProfileApi);
    return this.http.put<any>(ViewUserProfileApi, Update);
  }
}
