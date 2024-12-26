import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, of } from 'rxjs';

interface ErrorResponse {
  code: number;
  message: string;
  error: string;
}

@Injectable()
export class FormatErrorInterceptor<T>
  implements NestInterceptor<T, ErrorResponse>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ErrorResponse> {
    return next.handle().pipe(
      catchError((err) => {
        // 返回统一的错误格式
        return of({
          code: 500,
          message: '服务器错误',
          error: err.message || '未知错误',
        });
      }),
    );
  }
}
