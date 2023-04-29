import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Sensor } from '../schemas/sensor.schema';
import { SensorDTO } from '../dtos/sensor.dto';

@Injectable()
export class SensorService {
  constructor(@InjectModel('sensors') private sensorModel: Model<Sensor>) {}

  async create(createSensorDto: SensorDTO): Promise<Sensor> {
    return this.sensorModel.create(createSensorDto);
  }

  async findAll(): Promise<Sensor[]> {
    return this.sensorModel.find().exec();
  }

  async findOne(id: string): Promise<Sensor> {
    return this.sensorModel.findOne({ _id: id }).exec();
  }

  async updateSensorById(id: string, updatedSensor: Sensor): Promise<Sensor> {
    const sensor = await this.sensorModel
      .findByIdAndUpdate(id, updatedSensor, { new: true })
      .exec();
    return sensor;
  }

  async findSensorsByUserId(userId: string): Promise<Sensor[]> {
    const sensors = await this.sensorModel.find({ userId: userId }).exec();
    return sensors.map((sensor) => sensor.toObject());
  }

  async delete(id: string) {
    const deletedSensor = await this.sensorModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedSensor;
  }
}
