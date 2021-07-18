import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExploreStartupService {

  constructor(private http:HttpClient) { }

  ViewStartup():Observable<any>{
    let ViewStartupApi="http://localhost:52497/api/Startup/ViewStartups";
    console.log(ViewStartupApi);
    return this.http.get<any>(ViewStartupApi);
}
 
}
