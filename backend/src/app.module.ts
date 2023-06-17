import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MqttController } from './mqtt.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { InfluxDbModule } from './influx.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { SensorModule } from './sensor/sensor.module';
import { AuthModule } from './auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';
import { NotificationJobModule } from './cronjobs/NotificationJob.module';
import { NotificationModule } from './notifications/notification.module';

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
    MongooseModule.forRoot(
      'mongodb://root:root@mongodb:27017/moldApp?authSource=admin',
    ),
    UserModule,
    SensorModule,
    AuthModule,
    ScheduleModule.forRoot(),
    NotificationJobModule,
    NotificationModule,
  ],
  controllers: [AppController, MqttController],
  providers: [AppService],
})
export class AppModule {}
