import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const configService = app.get(ConfigService); // Access the ConfigService instance
  await app.listen(configService.get('PORT') || 3000); // Use the instance to access the 'get' method

  console.info(`server running on ${await app.getUrl()}`);
}
bootstrap();
