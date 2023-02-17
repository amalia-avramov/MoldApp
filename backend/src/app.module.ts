import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MqttController } from './mqtt.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { InfluxDbModule } from './influx.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    InfluxDbModule.forRootAsync({
      imports: [],
      useFactory: async function configuration(config: ConfigService) {
        return {
          url: config.get('INFLUX_URL') ?? '',
          token: config.get('INFLUX_TOKEN'),
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController, MqttController],
  providers: [AppService],
})
export class AppModule {}
