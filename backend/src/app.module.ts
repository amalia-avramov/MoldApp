import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MqttController } from './mqtt.controller';

@Module({
  imports: [],
  controllers: [AppController, MqttController],
  providers: [AppService],
})
export class AppModule {}
