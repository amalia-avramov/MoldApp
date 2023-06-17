export type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
};

export type LoginUser = {
  user: User;
  accessToken: string;
};

export type Sensor = {
  _id: string;
  userId: string;
  name: string;
  room: string;
  ipAddress: string;
  wallType: string;
};

export type Room = {
  sensorId: string;
  name: string;
};

export type SensorData = {
  temperature: number;
  humidity: number;
  moldIndex: number;
};

export type NotificationDTO = {
  _id: string;
  type: string;
  title: string;
  message: string;
  viewed: boolean;
  created_at: Date;
};
