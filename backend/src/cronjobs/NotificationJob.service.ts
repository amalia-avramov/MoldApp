import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InfluxDbService } from 'src/influx/influx.service';
import { NotificationService } from 'src/notifications/notification.service';
import { SensorService } from 'src/sensor/sensor.service';

@Injectable()
export class NotificationJob {
  constructor(
    @Inject(InfluxDbService) private readonly influxdbService: InfluxDbService,
    private readonly notificationService: NotificationService,
    private readonly sensorService: SensorService,
  ) {}

  // ----------------------------------------------------------
  // Notification Cron Job
  // ----------------------------------------------------------
  @Cron(CronExpression.EVERY_10_HOURS)
  async handleCron() {
    // Get all sensors from database and read values
    const sensors = await this.sensorService.findAll();
    const currentValues = sensors.map(async (sensor) => {
      return {
        parameters: await this.influxdbService.readData(sensor._id.toString()),
        userId: sensor.userId,
      };
    });

    // Verify mold index value
    Promise.all(currentValues).then((results) => {
      results.map((result) => {
        if (
          result.parameters.moldIndex > 1 &&
          result.parameters.moldIndex < 4
        ) {
          const date = new Date();
          // Add warning notification
          this.notificationService.create({
            type: '1',
            title: 'Hi there!',
            message: 'Mold index is high. Take necessary precautions.',
            viewed: false,
            created_at: date,
            userId: result.userId,
          });
        } else if (result.parameters.moldIndex >= 4) {
          const date = new Date();
          // Add critical notification
          this.notificationService.create({
            type: '2',
            title: 'Hi there!',
            message: 'Mold index is extremely high. Immediate action required!',
            viewed: false,
            created_at: date,
            userId: result.userId,
          });
        } else if (
          result.parameters.moldIndex >= 0 &&
          result.parameters.moldIndex <= 1
        ) {
          const date = new Date();
          // Add informational notification
          this.notificationService.create({
            type: '3',
            title: 'Hi there!',
            message: 'Mold index is within acceptable range.',
            viewed: false,
            created_at: date,
            userId: result.userId,
          });
        }
      });
    });
  }
}
