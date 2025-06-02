import {
    createParamDecorator,
    ExecutionContext,
    BadRequestException,
} from '@nestjs/common';

interface IdFromRequestOptions {
    name: string;         // 参数名，如 id
    type?: 'string' | 'int' | 'float'; // 类型，可选，默认 string
    source?: 'query' | 'param' | 'header'; // 来源，可选，默认 query
}

export const Qparams = createParamDecorator(
    (options: IdFromRequestOptions, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();

        const source = options.source || 'query';
        const rawValue =
            source === 'query'
                ? request.query[options.name]
                : source === 'param'
                    ? request.params[options.name]
                    : request.headers[options.name];

        if (rawValue === undefined) {
            throw new BadRequestException(`参数 ${options.name} 缺失`);
        }

        const valueStr = String(rawValue).trim();

        // 类型转换逻辑
        if (options.type === 'int') {
            const parsed = parseInt(valueStr, 10);
            if (isNaN(parsed)) throw new BadRequestException(`${options.name} 不是有效的整数`);
            return parsed;
        }

        if (options.type === 'float') {
            const parsed = parseFloat(valueStr);
            if (isNaN(parsed)) throw new BadRequestException(`${options.name} 不是有效的数字`);
            return parsed;
        }

        // 默认：string
        return valueStr;
    },
);
