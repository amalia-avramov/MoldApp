import { Controller, Get, Inject, Param } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  MqttContext,
  Payload,
} from '@nestjs/microservices';
import { InfluxDbService } from './influx.service';

export interface SensorValues {
  sensorId: string;
  time: Date;
  temperature: number;
  humidity: number;
}
@Controller('sensor')
export class MqttController {
  constructor(
    @Inject(InfluxDbService) private readonly influxdbService: InfluxDbService,
  ) {}

  @MessagePattern('sensor/#')
  getNotification(@Payload() data: SensorValues, @Ctx() context: MqttContext) {
    console.log(data);
    this.influxdbService.saveData(data, context.getTopic());
  }

  @Get(':id/data')
  async getData(@Param('id') id: string) {
    return this.influxdbService.readData(id);
  }
}
