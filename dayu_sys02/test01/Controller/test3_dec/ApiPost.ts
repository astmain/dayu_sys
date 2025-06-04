// decorators/post-with-doc.decorator.ts
import {applyDecorators, Post} from '@nestjs/common';
import {ApiOperation} from '@nestjs/swagger';
import {MyDecorator} from './MyDecorator';

/**
 * 自定义 Post 装饰器，封装 @Post + @ApiOperation
 * @param summary Swagger 文档说明
 * @param path 可选路由路径（默认使用方法名作为路径）
 * @param description
 */
export function ApiPost(path?: string, summary?: string, description?: string) {
    return applyDecorators(
        // MyDecorator,
        Post(path), // 如果 path 是 undefined，则相当于 @Post()
        // MyDecorator,
        ApiOperation({summary, description}),

    );
}
