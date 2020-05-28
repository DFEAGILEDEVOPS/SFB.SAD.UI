import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandlerService } from '@core/error-handling/error-handler.service';

/**
 * Intercepts the HTTP responses, and in case that an error/exception is thrown, handles it
 * and extract the relevant information of it.
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private errorHandler: ErrorHandlerService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // if (error instanceof HttpErrorResponse && error.status === 401) {
        //   localStorage.removeItem('token');
        //   this.router.navigateByUrl('/login');
        // }
        const errorMessage = this.errorHandler.getErrorMessage(error);
        return throwError(errorMessage);
      })
    );
  }
}
