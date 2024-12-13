import { registerAs } from '@nestjs/config';

export default registerAs('ali-oss', () => ({
  region: process.env.ALI_OSS_REGION,
  bucket: process.env.ALI_OSS_BUCKET,
  accessKeyId: process.env.ALI_OSS_ACCESS_KEY_ID,
  accessKeySecret: process.env.ALI_OSS_ACCESS_KEY_SECRET,
}));
