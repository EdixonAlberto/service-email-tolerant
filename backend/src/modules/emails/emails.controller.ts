import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { ApiTags, ApiOkResponse, ApiBadRequestResponse, ApiResponse } from '@nestjs/swagger'
import { EmailsService } from './services/emails.service'
import { MailBodyDto, EmailResponse } from './dto'
import { BadRequestResponse, ErrorResponse } from '@/common/dto'

@ApiTags('Emails')
@Controller('api/emails')
export class EmailsController {
  constructor(private readonly emailsService: EmailsService) {}

  @Post('/send_mail')
  @HttpCode(200)
  @ApiOkResponse({ type: EmailResponse })
  @ApiBadRequestResponse({ type: BadRequestResponse })
  @ApiResponse({ type: ErrorResponse, status: 500 })
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
