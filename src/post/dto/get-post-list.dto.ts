import { Transform, Type } from 'class-transformer';
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
  @Transform(({ value }) => {
    if (Array.isArray(value)) {
      return value.map((item) => Number(item));
    }
    return value;
  })
  categories: number[];

  @IsOptional()
  @IsString()
  category: string;

  @ValidateNested()
  @Type(() => PaginationDto)
  page: PaginationDto = new PaginationDto();
}
