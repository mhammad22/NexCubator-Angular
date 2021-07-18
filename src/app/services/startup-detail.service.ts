import { StartupProject } from './../Models/StartupProject';
import { Startup } from './../Models/Startup';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { StartupTeam } from '../Models/StartupTeam';

@Injectable({
  providedIn: 'root',
})
export class StartupDetailService {
  constructor(private http: HttpClient) {}

  //Startup Details
  StartupDetails(startupid: string): Observable<any> {
    let StartupDetailsApi =
      'http://localhost:52497/api/Startup/StartupDetails/' + startupid;
    console.log(StartupDetailsApi);
    return this.http.get<any>(StartupDetailsApi);
  }

  //Delete Startup ---- API Link Missing
  DeleteStartup(opost: string): Observable<any> {
    let DeleteStartupLink = 'http://localhost:52497/api/Startup'+ '/' + opost;
    return this.http
      .delete(DeleteStartupLink)
      .pipe(tap((data) => console.log(data)));
  }

  GetUserRole(): Observable<any> {
    let StringUserRole = 'http://localhost:52497/api/Account/GetUserRole';
    return this.http.get(StringUserRole);
  }

  //Delete Member --- API Link Fix
  DeleteMember(AddMemObj: string): Observable<any> {
    let AddMemberApi = 'http://localhost:52497/api/Startup' + '/' + AddMemObj;
    console.log("Link Delete Member  = ",AddMemberApi);
    console.log(AddMemberApi);
    return this.http
      .delete<any>(AddMemberApi)
      .pipe(tap((data) => console.log(data)));
  }

  //Delete Project --- Link Fix
  DeleteProject(AddProject: string): Observable<any> {
    let ProjectApi = 'http://localhost:52497/api/Startup' + '/' + AddProject;
    console.log("Link Delete Project  = ",ProjectApi);
    return this.http
      .delete<any>(ProjectApi)
      .pipe(tap((data) => console.log(data)));
  }

  //Delete Pitch --- Link Fix
  DeletePitch(pitch: string): Observable<any> {
    let ProjectApi = 'http://localhost:52497/api/Startup' + '/' + pitch;
    console.log("Link Delete Pitch  = ",ProjectApi);
    return this.http
      .delete<any>(ProjectApi)
      .pipe(tap((data) => console.log(data)));
  }
}
