import { Test, TestingModule } from '@nestjs/testing'
import { ConfigModule } from '@nestjs/config'
import { EmailsController } from './emails.controller'
import { EmailsService } from './services/emails.service'
import { MailgunService } from './services/mailgun.service'
import { SendgridService } from './services/sendgrid.service'

describe('EmailsController', () => {
  let controller: EmailsController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true })],
      controllers: [EmailsController],
      providers: [EmailsService, MailgunService, SendgridService]
    }).compile()

    controller = module.get<EmailsController>(EmailsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
