import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from '~/prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto, authorId: number) {
    if (createPostDto.isPublishNow) {
      createPostDto.publishDate = new Date();
    }
    return this.prisma.post.create({
      data: {
        title: createPostDto.title,
        content: createPostDto.content,
        desc: createPostDto.desc,
        publishDate: createPostDto.publishDate,
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

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.prisma.post.findUnique({ where: { id } });
    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found~`);
    }
    const res = await this.prisma.post.update({
      where: { id },
      data: {
        title: updatePostDto.title,
        desc: updatePostDto.desc,
        content: updatePostDto.content,
        publishDate: updatePostDto.isPublishNow
          ? new Date()
          : updatePostDto.publishDate,
        categories: {
          deleteMany: {},
          create: updatePostDto.categories.map((id) => ({
            category: { connect: { id } },
          })),
        },
      },
    });

    return res;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }

  // cleanObject(obj: Record<string, any>): Record<string, any> {
  //   return Object.entries(obj)
  //     .filter(
  //       ([key, value]) =>
  //         value !== null &&
  //         value !== undefined &&
  //         value !== '' &&
  //         value.length > 0,
  //     )
  //     .reduce((acc, [key, value]) => {
  //       acc[key] = value;
  //       return acc;
  //     }, {});
  // }
}
