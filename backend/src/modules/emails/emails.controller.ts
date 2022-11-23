import { Body, Controller, Post } from '@nestjs/common'
import { ApiProperty, ApiTags, ApiOkResponse } from '@nestjs/swagger'
import { EmailsService } from './services/emails.service'
import { MailBodyDto, EmailsDto } from '@/modules/emails/dto'
import { ResponseDto } from '@/common/dto'

class EmailResponse extends ResponseDto<EmailsDto> {
  @ApiProperty({ type: EmailsDto })
  data: EmailsDto
}

@ApiTags('Emails')
@Controller('api/emails')
export class EmailsController {
  constructor(private readonly emailsService: EmailsService) {}

  @Post('/send_mail')
  @ApiOkResponse({ type: EmailResponse })
  async sendMail(@Body() mailBody: MailBodyDto): Promise<EmailResponse> {
    const data = await this.emailsService.sendMailFaultTolerant(mailBody)

    return data.mailSended
      ? {
          response: 'Email Sended',
          data,
          error: null
        }
      : {
          response: 'Error',
          data: null,
          error: {
            code: data.status,
            message: data.message
          }
        }
  }
}
