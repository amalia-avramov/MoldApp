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

  @Post()
  async create(@Body() createdDto: NotificationDTO) {
    await this.notificationService.create(createdDto);
  }

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

  @Get()
  async findAll(): Promise<Notification[]> {
    return this.notificationService.findAll();
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.notificationService.delete(id);
  }

  @Delete()
  async deleteAll() {
    return this.notificationService.deleteAll();
  }
}
