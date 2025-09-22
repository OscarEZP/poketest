import { Injectable, OnModuleInit } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import axiosRetry from 'axios-retry';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { IPokeProvider } from '../../core/ports/poke.provider';

function extractId(url: string): number {
  const parts = url.split('/').filter(Boolean);
  return parseInt(parts[parts.length - 1] || '0', 10);
}

@Injectable()
export class PokeApiClient implements IPokeProvider, OnModuleInit {
  private baseURL: string;

  constructor(private http: HttpService, private cfg: ConfigService) {
    this.baseURL = this.cfg.get<string>('POKEAPI_BASE', 'https://pokeapi.co/api/v2');
  }

  onModuleInit() {
    const axios = this.http.axiosRef;
    axios.defaults.baseURL = this.baseURL;
    axios.defaults.timeout = 8000;
    axiosRetry(axios, {
      retries: 2,
      retryDelay: axiosRetry.exponentialDelay,
      retryCondition: (err) => !!err && (!err.response || err.response.status >= 500),
    });
  }

  async list(offset: number, limit: number) {
    const { data } = await firstValueFrom(
      this.http.get(`/pokemon`, { params: { offset, limit } }),
    );
    return { total: data.count, results: data.results as { name: string; url: string }[] };
  }

  async getAllNames() {
    const { data } = await firstValueFrom(
      this.http.get(`/pokemon`, { params: { offset: 0, limit: 100000 } }),
    );
    return data.results as { name: string; url: string }[];
  }

  async getByIdOrName(idOrName: string | number) {
    const { data } = await firstValueFrom(this.http.get(`/pokemon/${idOrName}`));
    return data;
  }
}
