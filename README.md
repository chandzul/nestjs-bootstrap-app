<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Use multiple database

To use a multiple database follow this steps
```ts
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class NameService {
  // inject datasource, remember datasurce is a global instance
  constructor(
    private readonly dataSource: DataSource,
  )
  
  // get resources wit .query()
  async getDataWithQueryRaw() {
    const email = 'jonh@doe.com';

    const result = await this.dataSource.query(
      `
        SELECT * FROM name_database1.users
          WHERE email=?
        AND isActive = 1;
      `,
      [email],
    );
    
    return result;
  }

  // get resources with .createQueryBuilder instance
  async getDataWithQueryBuilder() {
    const query = this.dataSource.createQueryBuilder();

    const comments = await query
      .select('id', 'body', 'likes')
      .from('name_database2.comments', 'comments')
      .where('comments.likes >= :likes', { likes: '100' })
      .getRawMany();

    return comments;
  }
}
```

> remember that the database must first be configured at `app.module.ts` 

## Custom Pipe injecting database and Request

To validate incoming data previously stored in database

```ts
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
      throw new BadRequestException('User not exist');
    }

    return value;
  }
}
```
To use in controller call with:

```ts
  @UsePipes(FileNameValidationPipe)
  async uploadFile() {}
```

## Resources

- [A Nest JS Pipeline Cheatsheet](https://www.darraghoriordan.com/2021/11/03/nest-cheatsheet-interceptor-middleware-guard/)
- [difference-between-interceptor-vs-middleware-vs-filter-in-nest-js](https://stackoverflow.com/questions/54863655/whats-the-difference-between-interceptor-vs-middleware-vs-filter-in-nest-js)
- [image](https://i.stack.imgur.com/2lFhd.jpg)
- [Injecting request object to a custom validation class in NestJS](https://dev.to/avantar/injecting-request-object-to-a-custom-validation-class-in-nestjs-5dal)
- [Creación de un Custom Pipe para validar contra un servicio en NestJS](https://dev.to/raguilera82/creacion-de-un-custom-pipe-para-validar-contra-un-servicio-4bdi)

## Support

...

## Stay in touch

- Author - [@chandzul](https://chandzul.com)

## License

Nest is [MIT licensed](LICENSE).
