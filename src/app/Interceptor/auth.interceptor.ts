import { LoginFormService } from './../login-form/login-form.service';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { tap, map, retry } from 'rxjs/operators';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(public obj: LoginFormService) {}

  // Add token in every header of http request to the server
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.obj.returntoken()}`,
      },
    });
    request = request.clone({
      headers: request.headers.set(
        'Content-Type',
        'application/json; charset-ISO-8859-1'
      ),
    });
    request = request.clone({
      headers: request.headers.set('Access-Control-Allow-Credential', 'true'),
    });
    console.log('Interceptor Invoked');
    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        let errorMessage: string = '';
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          // errorMessage = `Error Code: ${error.status}\nMessage: Cannot reach server! Try again later.`;
        }
        if (!errorMessage.search('failure') && !errorMessage.search("http://localhost:52497/api/ProjectTasks/PostProjectTask")) {
          window.alert(errorMessage);
        }
        return throwError(errorMessage);
      })
    );

    console.log(this.obj.returntoken());

    return next.handle(request);
  }
}
