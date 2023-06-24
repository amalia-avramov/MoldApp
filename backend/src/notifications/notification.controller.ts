import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationDTO } from 'src/dtos/notification.dto';
import { Notification } from 'src/schemas/notification.schema';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  // ----------------------------------------------------
  // GET notification by user ID endpoind
  // ----------------------------------------------------
  @Get(':userId')
  async findSensorsByUserId(
    @Param('userId') userId: string,
  ): Promise<Notification[]> {
    return this.notificationService.findNotificationsByUserId(userId);
  }

  // ----------------------------------------------------
  // GET all notifications endpoint
  // ----------------------------------------------------
  @Get()
  async findAll(): Promise<Notification[]> {
    return this.notificationService.findAll();
  }

  // ----------------------------------------------------
  // POST notification endpoint
  // ----------------------------------------------------
  @Post()
  async create(@Body() createdDto: NotificationDTO) {
    await this.notificationService.create(createdDto);
  }

  // ----------------------------------------------------
  // PUT notification endpoint
  // ----------------------------------------------------
  @Put(':id')
  async updateNotificationById(
    @Param('id') id: string,
    @Body() updatedNotification: Notification,
  ): Promise<Notification> {
    return this.notificationService.updateNotificationById(
      id,
      updatedNotification,
    );
  }

  // ----------------------------------------------------
  // DELETE notification endpoint
  // ----------------------------------------------------
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.notificationService.delete(id);
  }

  // ----------------------------------------------------
  // DELETE all notifications endpoint
  // ----------------------------------------------------
  @Delete()
  async deleteAll() {
    return this.notificationService.deleteAll();
  }
}
