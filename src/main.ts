import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import serverlessExpress from '@vendia/serverless-express';

let server;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('FINET API')
    .setDescription('The FINET API description')
    .setVersion('1.0')
    .addGlobalResponse({
      status: 500,
      description: 'Internal server error',
    })
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.init();
  const express = app.getHttpAdapter().getInstance();
  return serverlessExpress({ app: express });

  // await app.listen(process.env.PORT ?? 3000);
}

export const handler = async (event, context) => {
  if (!server) server = await bootstrap();
  return server(event, context);
};

bootstrap();
