import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EmailMessage } from '../models/email-message';

@Injectable({ providedIn: 'root' })
export class SendinblueService {

  constructor(private http: HttpClient) { }

  sendEmail(emailMessage: EmailMessage, apiUrl: string, apiKey: string) {

    const headers = new HttpHeaders()
      .set('accept', 'application/json')
      .set('api-key', apiKey)
      .set('content-type', 'application/json');

    return this.http.post<any>(apiUrl, emailMessage, { headers });
  }

}
