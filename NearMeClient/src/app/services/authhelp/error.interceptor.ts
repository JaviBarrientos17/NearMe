import { AuthenticationService } from '../authentication.service';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // logout if 401 response returned from api
                console.warn('Error 401');
                console.log(err);

                this.authenticationService.removeToken();
                location.reload();
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }));
    }
}

