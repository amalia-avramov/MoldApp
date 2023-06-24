import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

export type SensorDocument = Sensor & Document;

@Schema()
export class Sensor {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: string;

  @Prop()
  userId: string;

  @Prop()
  ipAddress: string;

  @Prop()
  name: string;

  @Prop()
  wallType: string;

  @Prop()
  room: string;

  @Prop()
  isActive: boolean;
}

export const SensorSchema = SchemaFactory.createForClass(Sensor);
