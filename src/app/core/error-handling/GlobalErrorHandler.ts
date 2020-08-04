import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { appSettings } from '@core/config/settings/app-settings';
import { Router } from '@angular/router';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  /**
   *
   */
  constructor(private injector: Injector, private router: Router) {}
  handleError(error) {
    const settings = this.injector.get(appSettings);
    if (settings.consoleErrors) {
      console.error(error);
    }
    if (settings.customErrorPage) {
      this.router.navigate(['service-problem']);
    }
  }
}
