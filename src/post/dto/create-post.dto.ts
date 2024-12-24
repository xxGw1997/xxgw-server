import { Category } from '@prisma/client';

export class CreatePostDto {
  title: string;
  desc: string;
  content: string;
}
