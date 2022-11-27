import { NestFactory } from '@nestjs/core'
import { Logger, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { NestExpressApplication } from '@nestjs/platform-express'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  const options = new DocumentBuilder()
    .setTitle('Service Email')
    .setDescription('Service fault-tolerant to sending emails')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, options)
  const config = app.get(ConfigService)
  const loggerApi = new Logger('API')
  const portHTTP = Number(config.get<string>('PORT')) || 3000
  const whitelist = config.get<string>('WHITE_LIST').split(',')
  const pathDoc = 'api/docs'

  SwaggerModule.setup(pathDoc, app, document, {
    customSiteTitle: 'Docs - Service Email'
  })

  app.enableCors({
    origin(origin, callback) {
      if (!origin || whitelist.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    methods: 'POST,OPTIONS'
  })

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    })
  )

  await app.listen(portHTTP, () => {
    loggerApi.log(`Server listening in port "${portHTTP}"`)
    loggerApi.log(`Documentation generate by swagger in "/${pathDoc}"`)
  })
}
bootstrap()
