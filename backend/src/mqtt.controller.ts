import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class MqttController {
  @MessagePattern('test')
  getNotification(@Payload() data: any) {
    console.log(data);
  }
}
