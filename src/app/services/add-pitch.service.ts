import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { StartupPitch } from '../Models/StartupPitch';

@Injectable({
  providedIn: 'root',
})
export class AddPitchService {
  constructor(private http: HttpClient) {}

  AddPitch(AddPitchObj: StartupPitch): Observable<any> {
    let StartupPitchApi = 'http://localhost:52497/api/Startup/AddPitch';
    console.log(StartupPitchApi);
    return this.http
      .post<any>(StartupPitchApi, AddPitchObj)
      .pipe(tap(
        (data) => console.log('Inside service: ', data),
        (err)=>{
          // console.log("error:", err)
        }));
  }

   
  //Get Request for startup Details
  //Startup Details
  StartupDetails(startupid: string): Observable<any> {
    let StartupDetailsApi =
      'http://localhost:52497/api/Startup/StartupDetails/' + startupid;
    console.log(StartupDetailsApi);
    return this.http.get<any>(StartupDetailsApi);
  }

  //Edit Pitch -- Link to be updated
  EditPitch(AddPitchObj: StartupPitch): Observable<any> {
    let StartupPitchApi = 'http://localhost:52497/api/Startup/AddPitch';
    console.log(StartupPitchApi);
    return this.http
      .put<any>(StartupPitchApi, AddPitchObj)
      .pipe(tap(
        (data) => console.log('Inside service: ', data),
        (err)=>{
          // console.log("error:", err)
        }));
  }



}
