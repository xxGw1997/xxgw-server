import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AliOssModule } from './ali-oss/ali-oss.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule, AliOssModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
