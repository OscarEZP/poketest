// src/redis/redis.service.ts
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleDestroy {
  private client = new Redis(process.env.REDIS_URL!, {
    maxRetriesPerRequest: null,
    enableAutoPipelining: true,
    retryStrategy: (tries) => Math.min(1000 * 2 ** tries, 15000),
  });

  onModuleDestroy() { this.client.disconnect(); }

  async get<T>(key: string): Promise<T | null> {
    const raw = await this.client.get(key);
    try { return raw ? JSON.parse(raw) : null; } catch { return raw as any; }
  }

  async set(key: string, value: unknown, ttl?: number) {
    const v = typeof value === 'string' ? value : JSON.stringify(value);
    return ttl ? this.client.set(key, v, 'EX', ttl) : this.client.set(key, v);
  }

  async del(key: string) { return this.client.del(key); }
}
