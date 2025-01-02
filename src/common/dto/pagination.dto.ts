import { Type } from 'class-transformer';
import { IsInt, IsNumber, Min } from 'class-validator';

export class PaginationDto {
  @IsNumber()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  index: number;

  @IsNumber()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  size: number;
}
