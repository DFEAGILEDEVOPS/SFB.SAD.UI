import { EmailAddress } from './email-address';
import { Attachment } from './attachment';

export interface EmailMessage {
  sender: EmailAddress;
  to: EmailAddress[];
  bcc?: EmailAddress[];
  cc?: EmailAddress[];
  htmlContent: string;
  textContent?: string;
  subject: string;
  replyTo?: EmailAddress;
  attachment?: Attachment;
  templateId?: number;
  params?: any;
  tags?: string[];
}
