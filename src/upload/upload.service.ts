import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { S3Service } from '../infraestructure/aws/s3/s3.service';
import { ConfigService } from '@nestjs/config';
import * as Buffer from 'buffer';
import { DataSource } from 'typeorm';

@Injectable()
export class UploadService {
  constructor(
    private readonly s3Service: S3Service,
    private readonly configService: ConfigService,
    private readonly dataSource: DataSource,
  ) {}

  async uploadFile(dataBuffer: Buffer, fileName) {
    const bucket = `${this.configService.get('AWS_BUCKET')}`;

    const connection = this.dataSource;

    try {
      const uploadResult = await this.s3Service.uploadFile({
        Bucket: bucket,
        Body: dataBuffer,
        Key: `custom-route/${fileName}`,
      });

      return uploadResult;
    } catch (e) {
      console.log(e);
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }
}
