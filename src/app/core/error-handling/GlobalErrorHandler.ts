import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  handleError(error) {
    document.getElementById('toast-wrapper').style.display = 'block';
    document.getElementById('toast-body').innerText = error;

    console.error(error);
  }
}
