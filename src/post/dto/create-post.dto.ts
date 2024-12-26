import { IsArray, IsNotEmpty, IsString } from 'class-validator';

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
}
