import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from '~/prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto, authorId: number) {
    if (createPostDto.isPublishNow) {
      createPostDto.date = new Date();
    }
    return this.prisma.post.create({
      data: {
        title: createPostDto.title,
        content: createPostDto.content,
        desc: createPostDto.desc,
        publishDate: createPostDto.date,
        author: { connect: { id: authorId } },
        categories: {
          create: createPostDto.categories.map((id) => ({
            category: { connect: { id } },
          })),
        },
      },
    });
  }

  findAll() {
    return `This action returns all post`;
  }

  async findOne(id: number) {
    const post = await this.prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        categories: true,
      },
    });
    if (!post) throw new Error(`Post with id ${id} not found~`);

    const categories = post.categories.map((c) => c.categoryId);
    return {
      ...post,
      categories,
    };
  }

  update(id: number, updatePostDto: Prisma.PostUpdateInput) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
