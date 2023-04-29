import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SensorDocument = Sensor & Document;

@Schema()
export class Sensor {
  @Prop()
  userId: string;

  @Prop()
  ipAddress: string;

  @Prop()
  wallType: string;

  @Prop()
  room: string;
}

export const SensorSchema = SchemaFactory.createForClass(Sensor);
