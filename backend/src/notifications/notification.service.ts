import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationDTO } from 'src/dtos/notification.dto';
import { Notification } from 'src/schemas/notification.schema';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel('notifications')
    private notificationModel: Model<Notification>,
  ) {}

  async create(createNotificationDto: NotificationDTO): Promise<Notification> {
    const createdNotification = new this.notificationModel(
      createNotificationDto,
    );
    return createdNotification.save();
  }

  async updateNotificationById(
    id: string,
    updatedNotification: Notification,
  ): Promise<Notification> {
    const sensor = await this.notificationModel
      .findByIdAndUpdate(id, updatedNotification, { new: true })
      .exec();
    return sensor;
  }

  async findAll(): Promise<Notification[]> {
    return (await this.notificationModel.find().exec()).reverse();
  }

  async delete(id: string) {
    const deletedNotification = await this.notificationModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedNotification;
  }

  async deleteAll() {
    return this.notificationModel.deleteMany();
  }
}
