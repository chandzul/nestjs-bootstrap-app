import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../users/entities/user.entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Coffee } from '../coffees/entities/coffee.entity';
import { ApiKey } from 'src/users/api-keys/entities/api-key.entity';

export const postgresConfigFactory: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: +configService.get<number>('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    entities: [User, Coffee, ApiKey],
    synchronize: true,
    logging: configService.get('DB_LOGGING') === 'true' ? true : false,
    namingStrategy: new SnakeNamingStrategy(),
  }),
  inject: [ConfigService],
};
