export interface PokemonListItem { id: number; name: string; image: string; }
export interface PokemonListResult { items: PokemonListItem[]; total: number; }
export interface PokemonDetail {
  id: number; name: string;
  height: number; weight: number;
  types: string[];
  sprites: { front?: string };
}

export abstract class IPokeApi {
  abstract list(page: number, pageSize: number, query?: string): Promise<PokemonListResult>;
  abstract detail(nameOrId: string | number): Promise<PokemonDetail>;
}
