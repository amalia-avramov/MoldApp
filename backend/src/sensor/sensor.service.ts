import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Sensor } from '../schemas/sensor.schema';
import { SensorDTO } from '../dtos/sensor.dto';

@Injectable()
export class SensorService {
  constructor(@InjectModel('sensors') private sensorModel: Model<Sensor>) {}

  async create(createSensorDto: SensorDTO) {
    const newSensor = new this.sensorModel(createSensorDto);
    const savedSensor = newSensor.save();
    return (await savedSensor).toObject();
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

  async findRooms(userId: string) {
    const distinctRooms = await this.sensorModel.distinct('room', {
      userId,
    });
    const sensors = await Promise.all(
      distinctRooms.map(async (room) => {
        const sensorsForRoom = await this.sensorModel.find({
          userId,
          room,
        });
        return sensorsForRoom.map((sensor) => ({
          sensorId: sensor._id,
          name: room,
        }));
      }),
    );
    return sensors.flat();
  }

  async delete(id: string) {
    const deletedSensor = await this.sensorModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedSensor;
  }
}
