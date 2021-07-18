import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { StartupProject } from '../Models/StartupProject';

@Injectable({
  providedIn: 'root',
})
export class AddProjectService {
  baseUrl = 'http://localhost:52497';

  constructor(private http: HttpClient) {}

  //Add Project
  AddProject(AddProjectObj: StartupProject): Observable<any> {
    let StartupProjectApi = this.baseUrl + '/api/Startup/AddProject';
    //let StartupProjectApi="";
    console.log(StartupProjectApi);
    return this.http.post<any>(StartupProjectApi, AddProjectObj).pipe(
      tap((data) => {
        console.log(data);
        let projectId = data.ProjectId;
        sessionStorage.setItem('ProjectId', projectId.toString());
      })
    );
  }

  //Edit Project --- Link to be Updated
  EditProject(AddProjectObj: StartupProject): Observable<any> {
    let StartupProjectApi = this.baseUrl + '/api/Startup/AddProject';
    //let StartupProjectApi="";
    console.log(StartupProjectApi);
    return this.http.put<any>(StartupProjectApi, AddProjectObj).pipe(
      tap((data) => {
        console.log(data);
      })
    );
  }


  AddProjectPeople(members: any): Observable<any> {
    members.push(sessionStorage.getItem('ProjectId').toString());
    console.log(JSON.stringify(members));
    sessionStorage.removeItem('ProjectId');

    let StartupProjectPeopleApi =
      this.baseUrl + '/api/Startup/AddMemberToProject/' + members;
    console.log(StartupProjectPeopleApi);

    return this.http
      .post<any>(StartupProjectPeopleApi, JSON.stringify(members))
      .pipe(
        tap((data: any) => {
          console.log(data);
        })
      );
  }

  //Startup Details
  StartupDetails(startupid: string): Observable<any> {
    let StartupDetailsApi =
      'http://localhost:52497/api/Startup/StartupDetails/' + startupid;
    console.log(StartupDetailsApi);
    return this.http.get<any>(StartupDetailsApi);
  }
}
