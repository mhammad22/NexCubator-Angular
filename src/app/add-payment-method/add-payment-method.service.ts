import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AddPaymentMethodService {
  baseUrl = 'http://localhost:52497';

  constructor(private http: HttpClient) {}

  addPaymentMethod(data: string): Observable<any> {
    let newApi = this.baseUrl + '/api/Payment/AddPaymentMethod';
    return this.http.post(newApi, data).pipe(tap((data) => {}));
  }

   GetPaymentMethd():Observable<any> {
    let newApi = this.baseUrl + '/api/Payment/GetPaymentMethod';
    return this.http.get(newApi).pipe(
      tap((data: any) => {
        console.log(data);
      })
    );
   }


}
