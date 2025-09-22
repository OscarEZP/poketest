import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/config.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { CacheModule } from '@nestjs/cache-manager';
import { HttpModule } from '@nestjs/axios';

import { HealthController } from './interfaces/http/health.controller';
import { PokeController } from './interfaces/http/poke.controller';

import { PokeService } from './core/services/poke.service';
import { PokeApiClient } from './infra/http/pokeapi.client';
import { CacheAdapterService } from './infra/cache/cache.service';
import { TOKENS } from './common/tokens';

@Module({
  imports: [
    AppConfigModule,
    ThrottlerModule.forRoot([{
      ttl: 60_000,
      limit: 100,
    }]),

    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => {
        const ttl = parseInt(process.env.CACHE_TTL_SECONDS ?? '300', 10);
        const host = process.env.REDIS_HOST;
        const port = parseInt(process.env.REDIS_PORT ?? '6379', 10);
        if (host) {
          const { redisStore } = await import('cache-manager-redis-yet');
          return { store: redisStore, socket: { host, port }, ttl };
        }
        return { ttl, max: 1000 };
      }
    }),
    HttpModule.register({}),
  ],
  controllers: [HealthController, PokeController],
  providers: [PokeService, PokeApiClient, CacheAdapterService,
    { provide: TOKENS.POKE_PROVIDER, useExisting: PokeApiClient },
    { provide: TOKENS.CACHE_PROVIDER, useExisting: CacheAdapterService },],
})
export class AppModule {}
