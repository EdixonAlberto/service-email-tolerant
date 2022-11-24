import { Injectable } from '@nestjs/common'
import { MailBodyDto, EmailsDto } from '@/modules/emails/dto'
import { MailgunService } from './mailgun.service'
import { SendgridService } from './sendgrid.service'

@Injectable()
export class EmailsService {
  constructor(private readonly mailgunService: MailgunService, private readonly sendgridService: SendgridService) {}

  public async sendMailFaultTolerant(mailBody: MailBodyDto): Promise<EmailsDto> {
    const mailServiceList: TMailService[] = [
      this.mailgunService,
      this.sendgridService
      // add others services...
    ].filter(
      service =>
        !mailBody?.service ||
        mailBody.service === 'fault-tolerant' ||
        service.name.toLowerCase() === mailBody.service + 'service'
    )

    let response: EmailsDto = null

    for (const mailService of mailServiceList) {
      try {
        response = await mailService.sendMail(mailBody)
        if (response.mailSended) break
      } catch (_) {
        continue
      }
    }

    return response && response.mailSended
      ? response
      : {
          mailSended: false,
          status: response?.status || 500,
          message: 'Mail could not be sent because all services failed'
        }
  }
}
