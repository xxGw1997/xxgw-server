import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { FormatResponseInterceptor } from './common/interceptors/format-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  // 全局返回格式化拦截器
  app.useGlobalInterceptors(new FormatResponseInterceptor());
  // 全局错误格式化拦截器
  // app.useGlobalInterceptors(new FormatErrorInterceptor());

  app.enableCors({
    origin: process.env.ADMIN_URL, // 前端的运行地址
    credentials: true, // 如果需要发送 cookie 或凭据，设置为 true
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // 允许的 HTTP 方法
    allowedHeaders: 'Content-Type, Authorization', // 允许的请求头
  });

  await app.listen(process.env.PORT ?? 9798);
}
bootstrap();
