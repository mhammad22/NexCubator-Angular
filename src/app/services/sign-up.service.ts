import { Observable } from 'rxjs';
import { RegisterBindingModel } from '../Models/RegisterBindingModel';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  constructor(private http: HttpClient, private router: Router) {}

  //store data in the db of user. Signup
  StoreUser(Obj: RegisterBindingModel): Observable<any> {
    let url = 'http://localhost:52497/api/Account/Register';
    console.log(Obj);
    console.log("Inside Sign Up Service");
    return this.http
      .post<any>(url, Obj)
      .pipe(tap((data) => console.log(data)));
  }

  SignOut():Observable<any>{
    return this.http.get('http://localhost:52497/api/Account/SignOut').pipe(tap((data:any)=>{

    }))
  }
}
