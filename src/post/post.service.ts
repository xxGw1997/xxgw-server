import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from '~/prisma/prisma.service';
import { GetPostListDto } from './dto/get-post-list.dto';

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

  async findList(getListParams: GetPostListDto) {
    const whereObj = {};
    Object.entries(getListParams).forEach(([k, v]) => {
      if (k === 'page') return;
      if (v && v.length > 0) {
        if (k === 'author') {
          whereObj[k] = {
            name: {
              contains: v,
            },
          };
        } else if (k === 'categories') {
          whereObj[k] = {
            some: {
              categoryId: {
                in: v,
              },
            },
          };
        } else {
          whereObj[k] = {
            contains: v,
          };
        }
      }
    });

    const page = getListParams.page;

    const [postList, total] = await Promise.all([
      this.prisma.post.findMany({
        where: whereObj,
        skip: page.index * page.size,
        take: page.size,
        select: {
          id: true,
          title: true,
          desc: true,
          publishDate: true,
          createdAt: true,
          author: {
            select: {
              name: true,
              email: true,
            },
          },
          categories: {
            select: {
              category: {
                select: {
                  title: true,
                },
              },
            },
          },
        },
      }),
      this.prisma.post.count({
        where: whereObj,
      }),
    ]);

    postList.forEach((post) => {
      const categories = post.categories.map((c) => c.category.title);
      post.categories = categories as any;
    });

    return {
      postList,
      page: {
        index: page.index,
        size: page.size,
        total,
      },
    };
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
}
