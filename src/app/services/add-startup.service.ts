import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Startup } from '../Models/Startup';

@Injectable({
  providedIn: 'root',
})
export class AddStartupService {
  constructor(private http: HttpClient) {}

  //Post request to create startup
  postStartup(opost: Startup): Observable<any> {
    return this.http
      .post('http://localhost:52497/api/Startup/Create', opost)
      .pipe(tap((data) => console.log(data)));
  }

  //Update Startup ---- API Link Missing
  UpdateStartup(opost: Startup): Observable<any> {
    return this.http
      .put('http://localhost:52497/api/Startup', opost)
      .pipe(tap((data) => console.log(data)));
  }


  //Get Request for startup Details
  //Startup Details
  StartupDetails(startupid: string): Observable<any> {
    let StartupDetailsApi =
      'http://localhost:52497/api/Startup/StartupDetails/' + startupid;
    console.log(StartupDetailsApi);
    return this.http.get<any>(StartupDetailsApi);
  }
}
