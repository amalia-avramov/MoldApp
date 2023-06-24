import { ObjectId } from 'mongoose';

export class SensorDTO {
  readonly _id: ObjectId;
  readonly userId: string;
  readonly ipAddress: string;
  readonly name: string;
  readonly wallType: string;
  readonly room: string;
  readonly isActive: boolean;
}
