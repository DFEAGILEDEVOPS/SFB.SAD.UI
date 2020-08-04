import { InjectionToken } from '@angular/core';
import { MetaTag } from '../../seo/models';

export class AppSettings {
  sfbDomain: string;
  apiDomain: string;
  customErrorPage: boolean;
  consoleErrors: boolean;
  azureMapsAPIKey: string;
  domain: string;
  name: string;
  version: string;
  demo: boolean;
  logo: string;
  seo: MetaTag;
}

export let appSettings = new InjectionToken<AppSettings>('AppSettings');
