import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { mysqlConfigFactory } from './mysql.config';
import { postgresConfigFactory } from './postgres.config';

@Module({
  imports: [TypeOrmModule.forRootAsync(postgresConfigFactory)],
})
export class DatabaseModule {}
