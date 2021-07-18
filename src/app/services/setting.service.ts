import { HttpClient } from '@angular/common/http';
import { Password } from './../Models/Password';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  baseUrl: string = 'http://localhost:52497';

  constructor(private http: HttpClient) {}

  ChangePassword(PasswordObj: Password): Observable<any> {
    let PasswordChangeApi = 'http://localhost:52497/api/Account/ChangePassword';
    console.log(PasswordChangeApi);
    return this.http.post<any>(PasswordChangeApi, PasswordObj);
  }

  GetUserRole(): Observable<any> {
    let StringUserRole = 'http://localhost:52497/api/Account/GetUserRole';
    return this.http.get(StringUserRole);
  }

  GetPaymentMethod(): Observable<any> {
    let NewApi = this.baseUrl + '/api/Payment/GetPaymentMethod';
    return this.http.get(NewApi).pipe(
      tap((data) => {
        console.log(data);
      })
    );
  }

  DeletePaymentMethod(id:number): Observable<any> {
    let NewApi = this.baseUrl + '/api/Payment/GetPaymentMethod';
    return this.http.delete(NewApi).pipe(
      tap((data) => {
        console.log(data);
      })
    );
  }

 

}
