import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { appSettings } from '@core/config/settings/app-settings';
import { Router } from '@angular/router';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private injector: Injector) {}

  handleError(error) {
    const settings = this.injector.get(appSettings);

    if (settings.customErrorPage) {
      const router = this.injector.get(Router);
      router.navigate(['service-problem']);
    }
    
    if (settings.consoleErrors) {
      console.error(error);
    }

  }
}
