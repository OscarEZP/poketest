import { IPokeApi, PokemonDetail, PokemonListResult } from "@/core/ports/poke.port";
import { http } from "@/infra/http/axiosClient";
import { z } from "zod";

const spriteFromId = (id: number) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

const listSchema = z.object({
  items: z.array(
    z.object({
      id: z.coerce.number(),
      name: z.string(),
      image: z.string().url().optional(), // <- ahora opcional
    })
  ),
  total: z.coerce.number(),
  page: z.coerce.number().optional(),
  pageSize: z.coerce.number().optional(),
}).passthrough(); // <- tolera campos extra si mañana agregas más

const detailSchema = z.object({
  id: z.number(),
  name: z.string(),
  height: z.number(),
  weight: z.number(),
  types: z.array(z.string()),
  sprites: z.object({ front: z.string().url().optional().nullable() }).partial().default({}),
});

export class PokeHttpAdapter implements IPokeApi {
  async list(page: number, pageSize: number, query?: string): Promise<PokemonListResult> {
    const { data } = await http.get("/pokemon", { params: { page, pageSize, query } });
    const parsed = listSchema.parse(data);
    // Completa imagen si falta
    return {
      ...parsed,
      items: parsed.items.map((it: any) => ({
        ...it,
        image: it.image ?? spriteFromId(it.id),
      })),
    };
  }

  async detail(nameOrId: string | number): Promise<PokemonDetail> {
    const { data } = await http.get(`/pokemon/${nameOrId}`);
    return detailSchema.parse(data) as any;
  }
}