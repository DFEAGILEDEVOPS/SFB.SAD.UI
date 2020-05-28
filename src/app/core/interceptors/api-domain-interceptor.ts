import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { appSettings } from '@core/config/settings/app-settings';

@Injectable()
export class ApiDomainInterceptor implements HttpInterceptor {
  /**
   * All interceptors become part of httpClientModule.
   * Injector, instead of appSettings, is being used because
   * AppSettings provider requires http i.e cyclic dependency.
   */
  constructor(private injector: Injector) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (request.url.endsWith('.json')) {
      return next.handle(request);
    }

    if (this.isAbsoluteUrl(request.url)) {
      return next.handle(request);
    }

     // TODO: This needs to be checked or fixed.
    const settings = this.injector.get(appSettings);
    const apiDomain = settings.apiDomain;
    const customRequest = request.clone({
      url: `${apiDomain}/${request.url}`
    });
    return next.handle(customRequest);
  }

  private isAbsoluteUrl(url: string): boolean {
    const absolutePattern = /^https?:\/\//i;
    return absolutePattern.test(url);
  }

}
