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
    const sensor = await this.sensorService.create(createSensorDto);
    const body = {
      mqttServer: '192.168.1.138',
      mqttUsername: 'hta-sensor',
      mqttPassword: 'amalia',
      mqttPort: '1883',
      sensorId: sensor._id.toString(),
    };

    await fetch(`http://${sensor.ipAddress}/onboard`,  {method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify})
      .then((res) => console.log(res.statusText))
      .catch((error) => {
        console.log(error);
      });
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

  @Get('/rooms/:userId')
  async findRooms(@Param('userId') userId: string) {
    return this.sensorService.findRooms(userId);
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
