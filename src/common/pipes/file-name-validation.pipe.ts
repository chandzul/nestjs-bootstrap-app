import {
  ArgumentMetadata,
  BadRequestException,
  Inject,
  Injectable,
  PipeTransform,
  Scope,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../users/entities/user.entity';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class FileNameValidationPipe implements PipeTransform {
  // constructor(@InjectDataSource('default') private datasource: DataSource) {}
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @Inject(REQUEST) private request: Request,
  ) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    try {
      await this.usersRepository.findOneOrFail({
        where: { email: 'jonh@doe.com' },
      });
    } catch (err) {
      throw new BadRequestException('Id not exist');
    }

    return value;
  }
}
