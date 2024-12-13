import { Controller, Post } from '@nestjs/common';
import { AliOssService } from './ali-oss.service';
import { Roles } from '~/auth/decorators/roles.decorator';
import { Public } from '~/auth/decorators/public.decorator';

@Controller('ali-oss')
export class AliOssController {
  constructor(private readonly aliOssService: AliOssService) {}

  // @Roles('ADMIN', 'EDITOR')
  @Public()
  @Post('getOssInfo')
  generateSignature() {
    return this.aliOssService.generateSignature();
  }
}
