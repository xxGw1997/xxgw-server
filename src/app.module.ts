import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AliOssModule } from './ali-oss/ali-oss.module';
import { PostModule } from './post/post.module';
import { CategoryModule } from './category/category.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule, AliOssModule, PostModule, CategoryModule, CommonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
