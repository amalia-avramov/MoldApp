import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NotificationDocument = Notification & Document;

enum Type {
  'WARNING',
  'CRITICAL',
  'INFO',
}

@Schema()
export class Notification {
  @Prop()
  type: Type;

  @Prop()
  title: string;

  @Prop()
  message: string;

  @Prop()
  viewed: boolean;

  @Prop()
  created_at: Date;

  @Prop()
  userId: string;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
