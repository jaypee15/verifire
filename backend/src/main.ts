import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Open Badges Platform API')
    .setDescription(`
      API documentation for the Open Badges 3.0 Platform.
      
      This API allows organizations to:
      - Create and manage badge templates
      - Issue badges to recipients
      - Verify badge authenticity
      - Manage badge revocations
      - Access analytics and reporting
      
      All endpoints requiring authentication expect a Bearer token in the Authorization header.
      
      For more information about the Open Badges 3.0 specification, visit:
      https://www.imsglobal.org/spec/ob/v3p0/
    `)
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter your JWT token',
      },
      'JWT-auth',
    )
    .addTag('auth', 'Authentication endpoints')
    .addTag('badges', 'Badge management endpoints')
    .addTag('analytics', 'Analytics and reporting endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
