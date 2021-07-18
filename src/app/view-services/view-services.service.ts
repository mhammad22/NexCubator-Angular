import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ViewServicesService {

  baseUrl="http://localhost:52497";

  constructor(private http:HttpClient) { }

  takePayment(productName: string, amount: number, token: any):Observable<any> {
    console.log("Inside service");
    let body = {
      tokenId: token.id,
      productName: productName,
      amount: amount,
    };
    let bodyString = JSON.stringify(body);
    console.log(bodyString);

    let newApi=this.baseUrl+"/api/Payment/TakePayment";

    return this.http.post(newApi,bodyString).pipe(tap((data)=>{
      console.log("Returned: ",data);
    }))
  }
}
