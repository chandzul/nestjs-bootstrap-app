import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsService {
  constructor() {}

  async send(notification): Promise<boolean> {
    return true;
  }
}
