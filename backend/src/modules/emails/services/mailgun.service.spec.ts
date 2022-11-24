import { Test, TestingModule } from '@nestjs/testing'
import { ConfigModule } from '@nestjs/config'
import { MailgunService } from './mailgun.service'

describe('MailgunService', () => {
  let service: MailgunService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true })],
      providers: [MailgunService]
    }).compile()

    service = module.get<MailgunService>(MailgunService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
