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
      ttl: 60_000, // 1 min
      limit: 100,  // 100 req/min/IP
    }]),

    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => {
        const { redisStore } = await import('cache-manager-redis-yet');
        return {
          store: redisStore,
          socket: {
            host: process.env.REDIS_HOST,
            port: parseInt(process.env.REDIS_PORT ?? '6379', 10),
          },
          password: process.env.REDIS_PASSWORD,
          ttl: parseInt(process.env.CACHE_TTL_SECONDS ?? '300', 10),
        };
      },
    }),
    HttpModule.register({}),
  ],
  controllers: [HealthController, PokeController],
  providers: [PokeService, PokeApiClient, CacheAdapterService,
    { provide: TOKENS.POKE_PROVIDER, useExisting: PokeApiClient },
    { provide: TOKENS.CACHE_PROVIDER, useExisting: CacheAdapterService },],
})
export class AppModule {}
