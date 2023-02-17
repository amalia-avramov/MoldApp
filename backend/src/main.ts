import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.MQTT,
    options: {
      url: configService.get('MQTT_URL'),
      username: configService.get('MQTT_USERNAME'),
      password: configService.get('MQTT_PASSWORD'),
    },
  });
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
