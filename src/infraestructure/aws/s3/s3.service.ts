import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { defaultServiceOptions, ParamsUploadFile, ServiceOptions } from "../interfaces/options";
import {
  PutObjectCommand,
  ListObjectsCommand,
  GetObjectAclCommand,
  S3,
} from '@aws-sdk/client-s3';

@Injectable()
export class S3Service {
  // a client can be shared by different commands.
  private readonly s3Client;

  constructor(
    @Inject('S3_CONFIGURATION_OPTIONS')
    private readonly options: ServiceOptions,
  ) {
    this.options = { ...defaultServiceOptions, ...options };
    this.s3Client = new S3(this.options);
  }

  async uploadFile(paramsUploadFile: ParamsUploadFile): Promise<any> {
    try {
      const uploadResult = await this.s3Client.send(
        new PutObjectCommand(paramsUploadFile),
      );

      return uploadResult;
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }
}
