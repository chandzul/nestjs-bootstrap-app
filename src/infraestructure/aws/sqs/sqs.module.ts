import { Module, DynamicModule } from '@nestjs/common';
import { PubsubServiceOptions } from '../interfaces/options';
import { SqsService } from './sqs.service';

@Module({})
export class SqsModule {
  static forRoot(options: Partial<PubsubServiceOptions>): DynamicModule {
    return {
      module: SqsModule,
      providers: [
        { provide: 'CONFIGURATION_OPTIONS', useValue: options },
        SqsService,
      ],
    };
  }
}
