import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SignupRoleFormService {
  baseURl = 'http://localhost:52497';

  constructor(private http: HttpClient) {}

  setRole(role: string): Observable<any> {
    let newApi = this.baseURl + '/api/Account/SetExternalRole/' + role;
    return this.http.get(newApi).pipe(tap((data) => {}));
  }

  getExistingRole():Observable<any>{
    let newApi=this.baseURl+'/api/Account/GetUserRole';
    return this.http.get(newApi).pipe(tap((data)=>{

    }));
  }
}
