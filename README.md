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

## Example un rapl to use a ApiKey

```ts
> uuid = 'random_unique_id'
'random_unique_id'
> payload = await get(apiKeysService).createAndHash(uuid)
Uncaught ReferenceError: apiKeysService is not defined
    at REPL15:1:53
> payload = await get(ApiKeysService).createAndHash(uuid)
{
  apiKey: 'cmFuZG9tX3VuaXF1ZV9pZCBhMGIxZGRjYi1mNjJkLTRlYzctOWI0OS04YzRiYjkzOGJjYjM=',
  hashedKey: '$2b$10$rDEi72ayO2O/ZZb9OH9jTeGDZvxYTmjMOwR1FhgHexO1bCAR2vDVO'
}
> await get("ApiKeyRepository").save({uuid, key: payload.hashedKey, user: { id: 1}})
```

## Resources

- [A Nest JS Pipeline Cheatsheet](https://www.darraghoriordan.com/2021/11/03/nest-cheatsheet-interceptor-middleware-guard/)
- [difference-between-interceptor-vs-middleware-vs-filter-in-nest-js](https://stackoverflow.com/questions/54863655/whats-the-difference-between-interceptor-vs-middleware-vs-filter-in-nest-js)
- [image](https://i.stack.imgur.com/2lFhd.jpg)
- [Injecting request object to a custom validation class in NestJS](https://dev.to/avantar/injecting-request-object-to-a-custom-validation-class-in-nestjs-5dal)
- [Creación de un Custom Pipe para validar contra un servicio en NestJS](https://dev.to/raguilera82/creacion-de-un-custom-pipe-para-validar-contra-un-servicio-4bdi)
- [Circular Dependencies in NestJS and how to Avoid Them](https://trilon.io/blog/avoiding-circular-dependencies-in-nestjs)

## Support

...

## Stay in touch

- Author - [@chandzul](https://chandzul.com)

## License

Nest is [MIT licensed](LICENSE).


Application api backend with Nestjs in which you want to manage the databases of customers as tenants, this means that for each customer that is configured to create your database.

To detect the tenant is considered to be handled by url as for example: `https://myawesmeapp.com/api/v1/name-client/resource ` where `name-client` is the name of the tenant at database level.

this implementation using dataSource typeOrm v0.3.*
