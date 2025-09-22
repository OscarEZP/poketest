import { Transform } from 'class-transformer';
import { IsInt, Min, IsOptional, IsString, Max } from 'class-validator';

export class ListQueryDto {
  @IsOptional()
  @IsString()
  query?: string;

  @Transform(({ value }) => Number(value ?? 1))
  @IsInt()
  @Min(1)
  page = 1;

  @Transform(({ value }) => Number(value ?? 20))
  @IsInt()
  @Min(1)
  @Max(100)
  pageSize = 20;
}
