import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

export type SensorDocument = Sensor & Document;

@Schema()
export class Sensor {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;

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
}

export const SensorSchema = SchemaFactory.createForClass(Sensor);
