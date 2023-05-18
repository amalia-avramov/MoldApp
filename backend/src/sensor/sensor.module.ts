import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SensorController } from './sensor.controller';
import { SensorService } from './sensor.service';
import { SensorSchema } from '../schemas/sensor.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'sensors', schema: SensorSchema }]),
  ],
  controllers: [SensorController],
  providers: [SensorService],
  exports: [SensorService],
})
export class SensorModule {}
