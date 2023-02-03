import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NotificationsModule } from './infraestructure/notifications/notifications.module';
import { UsersModule } from './users/users.module';
import { UploadModule } from './upload/upload.module';
import { DatabaseModule } from './database/database.module';
import { CoffeesModule } from './coffees/coffees.module';
import { IamModule } from './iam/iam.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    NotificationsModule,
    UploadModule,
    DatabaseModule,
    CoffeesModule,
    IamModule,
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  static port: number;

  constructor(private readonly configService: ConfigService) {
    AppModule.port = this.configService.get('APP_PORT');
  }
}
