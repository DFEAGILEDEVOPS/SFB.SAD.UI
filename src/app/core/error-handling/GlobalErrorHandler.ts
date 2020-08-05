import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { appSettings } from '@core/config/settings/app-settings';
import { Router } from '@angular/router';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { LoggingService } from '@core/network/services/logging.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  appInsights: ApplicationInsights;

  constructor(private injector: Injector, private loggingService: LoggingService) {}

  handleError(error) {
    const settings = this.injector.get(appSettings);

    if (settings.customErrorPage) {
      const router = this.injector.get(Router);
      router.navigate(['service-problem']);
    }

    if (settings.consoleErrors) {
      console.error(error);
    }

    if(settings.logExceptions) {
      this.logException(error);
    }
  }

  private logException(exception: Error, severityLevel?: number) {
    this.loggingService.logException(exception);
  }

}
