import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ProjectTask } from '../Models/ProjectTask';
import { ExploreStartupService } from '../services/explore-startup.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectManagementService implements OnInit {
  constructor(private http: HttpClient) {}

  baseUrl: string = 'http://localhost:52497';

  ngOnInit() {}

  AddProjectTask(obj: ProjectTask): Observable<any> {
    let newApi = this.baseUrl + '/api/ProjectTasks/PostProjectTask';
    console.log(newApi);
    console.log(obj);
    return this.http.post(newApi, obj).pipe(
      tap((data: any) => {
        console.log(data);
      })
    );
  }

  //Delete Project --link update
  DeleteProjectTask(taskid:number ): Observable<any> {
    let newApi = this.baseUrl + '/api/ProjectTasks/PostProjectTask';
    console.log(newApi);
    return this.http.delete(newApi).pipe(
      tap((data: any) => {
        console.log(data);
      })
    );
  }

  EditProjectTask(obj: ProjectTask): Observable<any> {
    let newApi = this.baseUrl + '/api/ProjectTasks/PostProjectTask';
    console.log(newApi);
    console.log(obj);
    return this.http.put(newApi, obj).pipe(
      tap((data: any) => {
        console.log(data);
      })
    );
  }

  AddMemberToTask(obj: any): Observable<any> {
    let newApi = this.baseUrl + '/api/ProjectTasks/AddMemberToTask/' + obj;
    console.log('AddMemberToTaskApi: ', newApi);

    return this.http.post(newApi, JSON.stringify(obj)).pipe(
      tap((data: any) => {
        console.log(data);
      })
    );
  }

  getTeamMembers(id: number): Observable<any> {
    let getMembers = this.baseUrl + '/api/Startup/GetMembers/';

    return this.http.get(getMembers + id).pipe(
      tap((data: any) => {
        console.log(data);
      })
    );
  }
}
