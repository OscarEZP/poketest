export interface PokemonListItem {
  name: string;
  id: number;
  sprite?: string; // opcional
}

export interface PokemonListResult {
  items: PokemonListItem[];
  total: number;
  page: number;
  pageSize: number;
}

export interface IPokeProvider {
  list(offset: number, limit: number): Promise<{ total: number; results: { name: string; url: string }[] }>;
  getByIdOrName(idOrName: string | number): Promise<any>;
  getAllNames(): Promise<{ name: string; url: string }[]>;
}
