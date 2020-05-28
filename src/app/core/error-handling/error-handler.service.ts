import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ErrorHandlerService {

  constructor() { }

  // TODO: This needs to be checked or fixed.
  getErrorMessage(errorResponse: HttpErrorResponse) {
    let errorMessage: string;
    // Client Side Error
    if (errorResponse.error instanceof ErrorEvent) {
      errorMessage = `Error: ${errorResponse.error.message}`;
    } else {
      // Server Side Error
      switch (errorResponse.status) {
        case 400:
          // handle validation errors
          const errors = [];
          Object.entries(errorResponse.error).forEach(([key, value]) => {
            errors.push(value);
          });
          errorMessage = errors.toString();
          break;

        default:
          errorMessage = `Error Code: ${errorResponse.status},  Message: ${errorResponse.message}`;
          break;
      }
    }
    return errorMessage;
  }
}
