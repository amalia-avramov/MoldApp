import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SensorService } from './sensor.service';
import { SensorDTO } from '../dtos/sensor.dto';
import { Sensor } from '../schemas/sensor.schema';

@Controller('sensors')
export class SensorController {
  constructor(private readonly sensorService: SensorService) {}

  @Post()
  async create(@Body() createSensorDto: SensorDTO) {
    console.log(createSensorDto);
    await this.sensorService.create(createSensorDto);
  }

  @Get()
  async findAll(): Promise<Sensor[]> {
    return this.sensorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Sensor> {
    return this.sensorService.findOne(id);
  }

  @Get('/user/:userId')
  async findSensorsByUserId(
    @Param('userId') userId: string,
  ): Promise<Sensor[]> {
    return this.sensorService.findSensorsByUserId(userId);
  }

  @Put(':id')
  async updateSensorById(
    @Param('id') id: string,
    @Body() updatedSensor: Sensor,
  ): Promise<Sensor> {
    return this.sensorService.updateSensorById(id, updatedSensor);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.sensorService.delete(id);
  }
}
