import { Controller, Get, Param, Query } from '@nestjs/common';
import { PokeService } from '../../core/services/poke.service';
import { ListQueryDto } from '../../core/dto/list-query.dto';

@Controller('pokemon')
export class PokeController {
  constructor(private readonly svc: PokeService) {}

  @Get()
  async list(@Query() q: ListQueryDto) {
    return this.svc.listPokemons(q.page, q.pageSize, q.query);
  }

  @Get(':idOrName')
  async detail(@Param('idOrName') idOrName: string) {
    return this.svc.getPokemon(idOrName);
  }
}
