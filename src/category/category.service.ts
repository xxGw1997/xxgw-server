import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '~/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createCategoryDto: CreateCategoryDto) {
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
    return this.prisma.category.findMany();
  }

  findOne(id: number) {
    return this.prisma.category.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: number, updateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  async findCount(id: number) {
    return await this.prisma.postCategory.count({ where: { categoryId: id } });
  }

  async remove(id: number) {
    const postsCountInUse = await this.findCount(id);
    if (postsCountInUse <= 0) {
      try {
        await this.prisma.category.delete({
          where: {
            id,
          },
        });
      } catch (error) {
        throw new NotFoundException(error);
      }
    }
    return {
      countInUse: postsCountInUse,
    };
  }
}
