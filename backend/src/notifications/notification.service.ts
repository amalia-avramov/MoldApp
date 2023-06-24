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

  // ----------------------------------------------------
  // Create notification function
  // ----------------------------------------------------
  async create(createNotificationDto: NotificationDTO): Promise<Notification> {
    const createdNotification = new this.notificationModel(
      createNotificationDto,
    );
    return createdNotification.save();
  }

  // ----------------------------------------------------
  // Update notification function
  // ----------------------------------------------------
  async updateNotificationById(
    id: string,
    updatedNotification: Notification,
  ): Promise<Notification> {
    const sensor = await this.notificationModel
      .findByIdAndUpdate(id, updatedNotification, { new: true })
      .exec();
    return sensor;
  }

  // ----------------------------------------------------
  // Find all notifications function
  // ----------------------------------------------------
  async findAll(): Promise<Notification[]> {
    return (await this.notificationModel.find().exec()).reverse();
  }

  // ----------------------------------------------------
  // Find notification by user ID function
  // ----------------------------------------------------
  async findNotificationsByUserId(userId: string): Promise<Notification[]> {
    return (
      await this.notificationModel.find({ userId: userId }).exec()
    ).reverse();
  }

  // ----------------------------------------------------
  // Delete notification function
  // ----------------------------------------------------
  async delete(id: string) {
    const deletedNotification = await this.notificationModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedNotification;
  }

  // ----------------------------------------------------
  // Delete all notifications function
  // ----------------------------------------------------
  async deleteAll() {
    return this.notificationModel.deleteMany();
  }
}
