import { Controller, Inject } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  MqttContext,
  Payload,
} from '@nestjs/microservices';
import { InfluxDbService } from './influx.service';

@Controller()
export class MqttController {
  constructor(
    @Inject(InfluxDbService) private readonly influxdbService: InfluxDbService,
  ) {}
  @MessagePattern('sensors/#')
  getNotification(@Payload() data: any, @Ctx() context: MqttContext) {
    console.log(data, context.getTopic());
    this.influxdbService.saveData();
  }
}
