import { NestFactory } from '@nestjs/core'
import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const options = new DocumentBuilder()
    .setTitle('Service Email')
    .setDescription('Service fault-tolerant to sending emails')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, options)
  const config = app.get(ConfigService)
  const portHTTP = Number(config.get<string>('PORT')) || 3000
  const loggerApi = new Logger('API')
  const pathMain = `http://localhost:${portHTTP}`
  const pathDoc = 'api/docs'

  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'Docs - Service Email'
  })

  await app.listen(portHTTP, () => {
    loggerApi.log(`Server listening at "${pathMain}"`)
    loggerApi.log(`Documentation generate by swagger in "${pathMain}/${pathDoc}"`)
  })
}
bootstrap()
