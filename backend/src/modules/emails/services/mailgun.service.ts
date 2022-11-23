import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as formData from 'form-data'
import Mailgun from 'mailgun.js'
import { MessagesSendResult } from 'mailgun.js/interfaces/Messages'
import { MailBodyDto } from '@/modules/emails/dto'

@Injectable()
export class MailgunService {
  private loggerMailgun = new Logger(MailgunService.name)

  constructor(private readonly config: ConfigService) {}

  public async sendMail(mailBody: MailBodyDto): Promise<MessagesSendResult> {
    const mailgun = new Mailgun(formData)
    const DOMAIN = this.config.get<string>('MAILGUN_DOMAIN')
    const API_KEY = this.config.get<string>('MAILGUN_API_KEY')
    const client = mailgun.client({ username: 'api', key: API_KEY })

    try {
      const messagesSendResult = await client.messages.create(DOMAIN, {
        from: mailBody?.from || `mailgun@${DOMAIN}`,
        to: mailBody.to,
        subject: mailBody.subject,
        text: mailBody.message
      })

      return messagesSendResult
    } catch (error) {
      const errorMessage = (error as Error).message
      this.loggerMailgun.error(errorMessage)
      return {
        status: 500,
        message: errorMessage
      }
    }
  }
}
