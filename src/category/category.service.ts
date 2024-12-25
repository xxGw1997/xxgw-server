import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '~/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createCategoryDto: Prisma.CategoryCreateInput) {
    const category = await this.prisma.category.findFirst({
      where: {
        title: createCategoryDto.title,
      },
    });
    if (category) {
      throw new ConflictException('Category already exists');
    }
    return this.prisma.category.create({
      data: createCategoryDto,
    });
  }

  findAll() {
    return `This action returns all category`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
