import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Module({
  providers: [NotificationsService],
  controllers: [],
  exports: [],
})
export class NotificationsModule {}
