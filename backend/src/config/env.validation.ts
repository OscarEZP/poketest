import * as Joi from 'joi';

export const envSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),

  PORT: Joi.number().default(3000),
  POKEAPI_BASE: Joi.string().uri().default('https://pokeapi.co/api/v2'),

  CACHE_TTL_SECONDS: Joi.number().default(300),
  REDIS_HOST: Joi.string().optional(),
  REDIS_PORT: Joi.number().optional(),
  REDIS_PASSWORD: Joi.string().allow('').optional(),
});
