import { MailBodyDto, EmailsDto } from '@/modules/emails/dto'
import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as sgMail from '@sendgrid/mail'
import { ClientResponse } from '@sendgrid/mail'

@Injectable()
export class SendgridService {
  private loggerSendgrid = new Logger(SendgridService.name)

  constructor(private readonly config: ConfigService) {}

  public async sendMail(mailBody: MailBodyDto): Promise<EmailsDto> {
    const DOMAIN = this.config.get<string>('SENDGRID_DOMAIN')
    const API_KEY = this.config.get<string>('SENDGRID_API_KEY')

    try {
      sgMail.setApiKey(API_KEY)

      const [clientResponse]: [ClientResponse, {}] = await sgMail.send({
        from: mailBody?.from || `sendgrid@${DOMAIN}`,
        to: mailBody.to,
        subject: mailBody.subject.trim(),
        text: mailBody.message.trim()
      })
      const { statusCode, body, headers } = clientResponse
      const mailSended = statusCode === 202

      return {
        serviceName: SendgridService.name,
        mailSended,
        id: mailSended ? headers['x-message-id'] : undefined,
        status: statusCode,
        message: mailSended ? 'Mail Sended' : body.toString()
      }
    } catch (error) {
      const errorMessage = (error as Error).message
      if (this.config.get<TEnv>('NODE_ENV') === 'development') this.loggerSendgrid.error(errorMessage)

      return {
        mailSended: false,
        status: 500,
        message: errorMessage
      }
    }
  }
}
