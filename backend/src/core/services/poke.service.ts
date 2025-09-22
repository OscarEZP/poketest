import { Injectable, Inject } from '@nestjs/common';
import { IPokeProvider, PokemonListItem, PokemonListResult } from '../ports/poke.provider';
import { ICacheProvider } from '../ports/cache.provider';
import { TOKENS } from '../../common/tokens';

@Injectable()
export class PokeService {
  private readonly INDEX_KEY = 'poke:index:names';
  private readonly DETAIL_KEY = (k:string|number)=>`poke:detail:${k}`;

  constructor(
    @Inject(TOKENS.POKE_PROVIDER) private provider: IPokeProvider,
    @Inject(TOKENS.CACHE_PROVIDER) private cache: ICacheProvider,
  ) {}

  private toOffset(page: number, pageSize: number) {
    return Math.max(0, (page - 1) * pageSize);
  }

  async listPokemons(page: number, pageSize: number, query?: string): Promise<PokemonListResult> {
    if (!query) {
      const offset = this.toOffset(page, pageSize);
      const { total, results } = await this.provider.list(offset, pageSize);
      const items: PokemonListItem[] = results.map(r => {
        // se obtiene el id a partir de la url, esto es para facilitar la busqueda y guardado en cache, aunque decidi que al momento de listar los elementos no se almacenan en cache
        const id = parseInt(r.url.split('/').filter(Boolean).pop() || '0', 10);
        return { name: r.name, id };
      });

      return { items, total, page, pageSize };
    }

    let index = await this.cache.get<{ name: string; url: string }[]>(this.INDEX_KEY);
    if (!index) {
      index = await this.provider.getAllNames();
      await this.cache.set(this.INDEX_KEY, index, 900);
    }
    const q = query.toLowerCase().trim();
    const filtered = index.filter(x => x.name.toLowerCase().includes(q));

    const total = filtered.length;
    const offset = this.toOffset(page, pageSize);
    const pageSlice = filtered.slice(offset, offset + pageSize);

    const items: PokemonListItem[] = pageSlice.map(r => {
      const id = parseInt(r.url.split('/').filter(Boolean).pop() || '0', 10);
      return { name: r.name, id };
    });

    return { items, total, page, pageSize };
  }

  async getPokemon(idOrName: string | number) {
    const key = this.DETAIL_KEY(idOrName);
    const cached = await this.cache.get<any>(key);
    if (cached) return cached;

    const data = await this.provider.getByIdOrName(idOrName);
    await this.cache.set(key, data, 600);
    return data;
  }
}
