import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import Redis from 'ioredis';

export class InvalidatedRefreshTokenError extends Error {}

@Injectable()
export class RefreshTokenIdsStorage
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private redisClient: Redis;

  onApplicationBootstrap(): any {
    // TODO: Ideally, we should move this to the dedicated "RedisModule"
    // instead of initiation the connection here.
    this.redisClient = new Redis({
      host: 'localhost',
      port: 6379,
    });
    // throw new Error('Method not implemented.');
  }

  onApplicationShutdown(signal?: string): any {
    return this.redisClient.quit();
    // throw new Error('Method not implemented.');
  }

  async insert(userId: number, tokenId: string): Promise<void> {
    await this.redisClient.set(this.getKey(userId), tokenId);
  }

  async validate(userId: number, tokenId: string): Promise<boolean> {
    const storeId = await this.redisClient.get(this.getKey(userId));

    if (storeId !== tokenId) {
      throw new InvalidatedRefreshTokenError();
    }

    return storeId === tokenId;
  }

  async invalidate(userId: number): Promise<void> {
    await this.redisClient.del(this.getKey(userId));
  }

  private getKey(userId: number): string {
    return `user-${userId}`;
  }
}
