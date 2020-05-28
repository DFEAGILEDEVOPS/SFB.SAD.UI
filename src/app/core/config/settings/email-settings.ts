import { InjectionToken } from '@angular/core';
import { EmailAddress, EmailProvider } from '../../network/models';

export class EmailSettings {
  emailAddresses: EmailAddress[];
  providers: EmailProvider[];
}

export let emailSettings = new InjectionToken<EmailSettings>('EmailSettings');
