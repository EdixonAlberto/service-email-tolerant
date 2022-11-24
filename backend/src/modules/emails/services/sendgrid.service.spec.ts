import { Test, TestingModule } from '@nestjs/testing'
import { ConfigModule } from '@nestjs/config'
import { SendgridService } from './sendgrid.service'

describe('SendgridService', () => {
  let service: SendgridService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true })],
      providers: [SendgridService]
    }).compile()

    service = module.get<SendgridService>(SendgridService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
