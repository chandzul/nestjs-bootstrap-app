import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { mysqlConfigFactory } from './mysql.config';

@Module({
  imports: [TypeOrmModule.forRootAsync(mysqlConfigFactory)],
})
export class DatabaseModule {}
