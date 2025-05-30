import {
    Injectable,
    NestInterceptor,
    CallHandler,
    ExecutionContext,
} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
interface Response<T> {
    data: T;
}
//拦截器 统一返回数据
@Injectable()//依赖注入
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
        console.log('ResponseInterceptor-Before...');
      const req = context.switchToHttp().getRequest();
      if(req.url=="/statusMonitor"){
        return next.handle()
      }
      const now = Date.now();
        return next.handle().pipe(
            map(async data => {
                let promiseData = await new Promise((resolve, reject)=>{
                    resolve(data)
                })
                console.log(`ResponseInterceptor-After... ${Date.now() - now}ms`)
                return {
                    data:promiseData,
                    code: 200,
                    message: '请求成功',
                };
            }),
        );
    }
}