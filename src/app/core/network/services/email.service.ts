import { Injectable, Inject } from '@angular/core';
import { SendinblueService } from './sendinblue.service';
import { EmailMessage, EmailProvider } from '../models';
import { emailSettings, EmailSettings } from '@core/config/settings/email-settings';

@Injectable({ providedIn: 'root' })
export class EmailService {

  constructor(@Inject(emailSettings) private emailsettings: EmailSettings, private sendinblueService: SendinblueService) { }

  sendEmail(emailMessage: EmailMessage, provider: EmailProvider) {
    return this.sendinblueService.sendEmail(emailMessage, provider.apiUrl, provider.apiKey);
  }

  getEmailProvider(name: string): EmailProvider {
    return this.emailsettings.providers.find(x => x.name === name);
  }

}
