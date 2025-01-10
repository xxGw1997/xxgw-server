import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { GetPostListDto } from './dto/get-post-list.dto';
import { Public } from '~/auth/decorators/public.decorator';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto, @Req() req: any) {
    return this.postService.create(createPostDto, req.user.id);
  }

  @Public()
  @Post('list')
  findList(@Body() getListParams: GetPostListDto) {
    return this.postService.findList(getListParams);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    return this.postService.remove(+id, req.user);
  }
}
