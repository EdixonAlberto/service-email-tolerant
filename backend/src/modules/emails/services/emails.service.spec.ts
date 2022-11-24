import { Test, TestingModule } from '@nestjs/testing'
import { ConfigModule } from '@nestjs/config'
import { EmailsService } from './emails.service'
import { MailgunService } from './mailgun.service'
import { SendgridService } from './sendgrid.service'

describe('EmailsService', () => {
  let service: EmailsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true })],
      providers: [EmailsService, MailgunService, SendgridService]
    }).compile()

    service = module.get<EmailsService>(EmailsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
