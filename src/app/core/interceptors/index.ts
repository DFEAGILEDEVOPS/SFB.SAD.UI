import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { UniversalInterceptor } from './universal-interceptor';
import { ApiDomainInterceptor } from './api-domain-interceptor';
import { ErrorInterceptor } from './error-interceptor';

export const httpInterceptors = [
  { provide: HTTP_INTERCEPTORS, useClass: UniversalInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ApiDomainInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
];
