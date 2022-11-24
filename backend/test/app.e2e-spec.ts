import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from './../src/app.module'
import { ResponseDto } from '../src/common/dto'
import { MailBodyDto, EmailsDto } from '../src/modules/emails/dto'

process.env.NODE_ENV = 'test'
const TEST_RECIPIENT_EMAIL = 'edixonalbertto@gmail'

describe('AppModule (e2e)', () => {
  let app: INestApplication
  let server = null
  let agent: request.SuperAgentTest

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = await moduleFixture.createNestApplication().init()
    server = await app.listen(4000)
    // Since the application is already listening, it should use the allocated port
    agent = request.agent(server)
  })

  afterEach(async () => {
    await app.close()
    if (server) await server.close()
  })

  describe('Module Emails', () => {
    it('POST: /api/emails/send_mail', async () => {
      const response = await agent
        .post('/api/emails/send_mail')
        .type('json')
        .send(<MailBodyDto>{
          from: 'test@example.com',
          to: TEST_RECIPIENT_EMAIL,
          subject: 'Testing service to send mails',
          message: 'This is a test message'
        })
        .expect(200)

      const { data } = response.body as ResponseDto<EmailsDto>
      expect(data?.mailSended).toEqual(true)
    })
  })
})
