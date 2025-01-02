import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { PaginationDto } from '~/common/dto/pagination.dto';

export class GetPostListDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  author: string;

  @IsOptional()
  @IsArray()
  categories: number[];

  @ValidateNested()
  @Type(() => PaginationDto)
  page: PaginationDto = new PaginationDto();
}
