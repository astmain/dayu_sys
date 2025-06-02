import {Injectable, NestInterceptor, CallHandler} from '@nestjs/common'
import {map} from 'rxjs/operators'
import {Observable} from 'rxjs'


interface Data<T> {
    result: T,
    code: number,
    msg: string,

}

@Injectable()
export class Config_filter_response<T = any> implements NestInterceptor {
    intercept(context, next: CallHandler): Observable<Data<T>> {
        return next.handle().pipe(map(data => {
            return {
                result: data.result || "缺少返回数据result",
                code: data.code || 999,
                msg: data.msg || "缺少消息提示"

            }
        }))
    }
}