import { Inject, Injectable } from '@nestjs/common';
import * as AliOss from 'ali-oss';
import aliOssConfig from './config/ali-oss.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AliOssService {
  aliOssClient: AliOss;
  constructor(
    @Inject(aliOssConfig.KEY)
    private readonly ossConfig: ConfigType<typeof aliOssConfig>,
  ) {
    this.aliOssClient = new AliOss({
      region: ossConfig.region,
      bucket: ossConfig.bucket,
      accessKeyId: ossConfig.accessKeyId,
      accessKeySecret: ossConfig.accessKeySecret,
    });
  }

  async generateSignature() {
    const expireDate = new Date();
    expireDate.setHours(expireDate.getHours() + 1);
    const res = this.aliOssClient.calculatePostSignature({
      expiration: expireDate.toISOString(),
      conditions: [
        ['content-length-range', 0, 50 * 1024 * 1024], //设置上传文件的大小限制(0~50MB)。
      ],
    });

    const location = await this.aliOssClient.getBucketLocation(
      this.ossConfig.bucket,
    );
    const host = `http://${this.ossConfig.bucket}.${location.location}.aliyuncs.com`;

    return {
      ...res,
      host,
      expireDate,
    };
  }
}
