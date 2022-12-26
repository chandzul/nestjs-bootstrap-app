import { Module, DynamicModule } from '@nestjs/common';
import { ServiceOptions } from '../interfaces/options';
import { S3Service } from './s3.service';

@Module({})
export class S3Module {
  static forRoot(options: Partial<ServiceOptions>): DynamicModule {
    return {
      module: S3Module,
      providers: [
        { provide: 'S3_CONFIGURATION_OPTIONS', useValue: options },
        S3Service,
      ],
      exports: [S3Service],
    };
  }
}
