import { Controller, Get, Inject, Param } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  MqttContext,
  Payload,
} from '@nestjs/microservices';
import { InfluxDbService } from '../influx/influx.service';

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

  // ----------------------------------------------------------
  // Subscribe function
  // ----------------------------------------------------------
  @MessagePattern('sensor/#')
  getNotification(@Payload() data: SensorValues, @Ctx() context: MqttContext) {
    this.influxdbService.saveData(data, context.getTopic());
  }

  // ----------------------------------------------------------
  // GET endpoint for sensor data
  // ----------------------------------------------------------
  @Get(':id/data')
  async getData(@Param('id') id: string) {
    return this.influxdbService.readData(id);
  }
}
