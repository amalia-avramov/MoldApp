import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InfluxDbService } from 'src/influx.service';
import { NotificationService } from 'src/notifications/notification.service';
import { SensorService } from 'src/sensor/sensor.service';

@Injectable()
export class NotificationJob {
  constructor(
    @Inject(InfluxDbService) private readonly influxdbService: InfluxDbService,
    private readonly notificationService: NotificationService,
    private readonly sensorService: SensorService,
  ) {}

  @Cron(CronExpression.EVERY_10_HOURS)
  async handleCron() {
    const sensors = await this.sensorService.findAll();
    const ids = sensors.map((sensor) => sensor._id.toString());
    const currentValues = ids.map((id) => this.influxdbService.readData(id));
    Promise.all(currentValues).then((results) => {
      results.map((result) => {
        if (result.moldIndex >= 2 && result.moldIndex < 4) {
          const date = new Date();
          this.notificationService.create({
            type: '1',
            title: 'Hi there!',
            message: 'Mold index is high. Take necessary precautions.',
            viewed: false,
            created_at: date,
          });
        } else if (result.moldIndex >= 4) {
          const date = new Date();
          this.notificationService.create({
            type: '2',
            title: 'Hi there!',
            message: 'Mold index is extremely high. Immediate action required!',
            viewed: false,
            created_at: date,
          });
        } else if (result.moldIndex >= 0 && result.moldIndex < 2) {
          const date = new Date();
          this.notificationService.create({
            type: '3',
            title: 'Hi there!',
            message: 'Mold index is within acceptable range.',
            viewed: false,
            created_at: date,
          });
        }
      });
    });
  }
}
