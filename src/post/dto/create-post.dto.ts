import {
  IsArray,
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  desc: string;

  @IsString()
  content: string;

  @IsArray()
  @IsNotEmpty()
  categories: number[];

  @IsBoolean()
  isPublishNow: boolean;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  date?: Date;
}
