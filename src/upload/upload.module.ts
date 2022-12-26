import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { S3Module } from '../infraestructure/aws/s3/s3.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [
    S3Module.forRoot({ apiVersion: '2006-03-01' }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
