import { Module } from '@nestjs/common';
import { AliOssService } from './ali-oss.service';
import { AliOssController } from './ali-oss.controller';
import { ConfigModule } from '@nestjs/config';
import aliOssConfig from './config/ali-oss.config';

@Module({
  imports: [ConfigModule.forFeature(aliOssConfig)],
  controllers: [AliOssController],
  providers: [AliOssService],
})
export class AliOssModule {}
