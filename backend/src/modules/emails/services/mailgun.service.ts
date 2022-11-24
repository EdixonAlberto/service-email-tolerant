import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as formData from 'form-data'
import Mailgun from 'mailgun.js'
import { MessagesSendResult } from 'mailgun.js/interfaces/Messages'
import { MailBodyDto, EmailsDto } from '@/modules/emails/dto'

@Injectable()
export class MailgunService {
  public name = MailgunService.name
  private loggerMailgun = new Logger(MailgunService.name)

  constructor(private readonly config: ConfigService) {}

  public async sendMail(mailBody: MailBodyDto): Promise<EmailsDto> {
    const DOMAIN = this.config.get<string>('MAILGUN_DOMAIN')
    const API_KEY = this.config.get<string>('MAILGUN_API_KEY')

    try {
      const mailgun = new Mailgun(formData)
      const client = mailgun.client({ username: 'api', key: API_KEY })

      const messagesSendResult: MessagesSendResult = await client.messages.create(DOMAIN, {
        from: mailBody?.from || `mailgun@${DOMAIN}`,
        to: mailBody.to,
        subject: mailBody.subject.trim(),
        text: mailBody.message.trim()
      })
      const { status, message, id } = messagesSendResult

      return {
        serviceName: this.name,
        mailSended: status === 200,
        id: id.split('@')[0].substring(1),
        status,
        message
      }
    } catch (error) {
      const errorMessage = (error as Error).message
      if (this.config.get<TEnv>('NODE_ENV') === 'development') this.loggerMailgun.error(errorMessage)

      return {
        mailSended: false,
        status: 500,
        message: errorMessage
      }
    }
  }
}
