import { Module, DynamicModule } from '@nestjs/common';
import { ServiceOptions } from '../interfaces/options';
import { SqsService } from './sqs.service';

@Module({})
export class SqsModule {
  static forRoot(options: Partial<ServiceOptions>): DynamicModule {
    return {
      module: SqsModule,
      providers: [
        { provide: 'SQS_CONFIGURATION_OPTIONS', useValue: options },
        SqsService,
      ],
      exports: [SqsService],
    };
  }
}
