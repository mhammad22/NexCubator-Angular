import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginFormService {
  constructor(private http: HttpClient, private router: Router) {}

  // Get Token of User and Store it into the local storage
  GetLoginCredentials(Login_Name: any, Login_Password: any): Observable<any> {
    console.log('Inside service');
    return this.http
      .post(
        'http://localhost:52497/token',
        'userName=' +
          Login_Name +
          '&password=' +
          Login_Password +
          '&grant_type=password',
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      )
      .pipe(
        tap((data) => {
          console.log(data);
          window.localStorage.removeItem('TokenInfo');
          window.localStorage.setItem('TokenInfo', data.access_token);

          window.localStorage.setItem('LoggedInUserEmail', Login_Name);
        })
      );
  }

  //return current user Startup or investor
  GetUserRole(): Observable<any> {
    let StringUserRole = 'http://localhost:52497/api/Account/GetUserRole';
    return this.http.get(StringUserRole);
  }

  // get Token from Local storage
  returntoken(): any {
    // let tokenInfo = JSON.parse(localStorage.getItem('TokenInfo')|| '{}');
    // return tokenInfo.access_token;
    let tokenInfo = localStorage.getItem('TokenInfo');
    return tokenInfo;
  }
}
