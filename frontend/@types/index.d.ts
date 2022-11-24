declare type TMail = {
  service?: 'fault-tolerant' | 'mailgun' | 'sendgrid'
  from?: string
  to: string
  subject: string
  message: string
}
