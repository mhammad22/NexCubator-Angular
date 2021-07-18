import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { StartupTeam } from '../Models/StartupTeam';

@Injectable({
  providedIn: 'root',
})
export default class AddMemberService {
  constructor(private http: HttpClient) {}

  //Add Member
  AddMember(AddMemObj: StartupTeam): Observable<any> {
    let AddMemberApi = 'http://localhost:52497/api/Startup/AddMember';
    console.log(AddMemberApi);
    return this.http
      .post<any>(AddMemberApi, AddMemObj)
      .pipe(tap((data) => console.log(data)));
  }

  //Edit Member
  EditMember(AddMemObj: StartupTeam): Observable<any> {
    let AddMemberApi = 'http://localhost:52497/api/Startup';
    console.log(AddMemberApi);
    return this.http
      .put<any>(AddMemberApi, AddMemObj)
      .pipe(tap((data) => console.log(data)));
  }

  //Startup Details
  StartupDetails(startupid: string): Observable<any> {
    let StartupDetailsApi =
      'http://localhost:52497/api/Startup/StartupDetails/' + startupid;
    console.log(StartupDetailsApi);
    return this.http.get<any>(StartupDetailsApi);
  }
}
