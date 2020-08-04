import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { appSettings } from '@core/config/settings/app-settings';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  /**
   *
   */
  constructor(private injector: Injector) {}
  handleError(error) {
    const settings = this.injector.get(appSettings);
    if (settings.consoleErrors) {
      console.error(error);
    }
  }
}
