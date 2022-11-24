type TEnv = 'production' | 'development' | 'test'

type TMailService = {
  name: string
  sendMail: (mailBody: import('@/modules/emails/dto').MailBodyDto) => Promise<import('@/modules/emails/dto').EmailsDto>
}
