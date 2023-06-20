import { Module } from '@nestjs/common';
import { NotificationJob } from './NotificationJob.service';
import { NotificationModule } from 'src/notifications/notification.module';
import { SensorModule } from 'src/sensor/sensor.module';

@Module({
  providers: [NotificationJob],
  imports: [NotificationModule, SensorModule],
})
export class NotificationJobModule {}
