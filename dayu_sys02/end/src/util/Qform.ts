import {
    createParamDecorator,
    ExecutionContext,
    BadRequestException,
} from '@nestjs/common';

interface FieldConfig {
    name: string;
    type?: 'string' | 'int' | 'float'| 'boolean';
    required?: boolean;
    source?: 'query' | 'param' | 'header';
}

export const Qform = createParamDecorator(
    (fields: FieldConfig[], ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const result: any = {};
        let uri = request.route.path
        let url = request.url
        console.log(`请求---url---Qform:`, url)

        for (const field of fields) {
            const source = field.source || 'query';
            const raw =
                source === 'query'
                    ? request.query[field.name]
                    : source === 'param'
                        ? request.params[field.name]
                        : request.headers[field.name];

            if (raw === undefined || raw === '') {
                if (field.required !== false) {
                    throw new BadRequestException(`参数 ${field.name} 缺失`);
                } else {
                    result[field.name] = undefined;
                    continue;
                }
            }

            const valueStr = String(raw).trim();
            // console.log(`111---222:`,     request.query[field.name]     ,  field,"111",  request.query )

            let value: any = valueStr;
            if (field.type === 'int') {
                // console.log(`111---valueStr:`,     valueStr        )
                if (!isPureNumberByRegex(valueStr)) throw new BadRequestException(`${field.name} 不是有效的整数--${valueStr}`);
                value = parseInt(valueStr, 10);
            } else if (field.type === 'float') {
                if (!isPureNumberByRegex(valueStr)) throw new BadRequestException(`${field.name} 不是有效的整数--${valueStr}`);
                value = parseFloat(valueStr);
            } else if (field.type === 'string') {
                console.log(`111---string---field:`, field)

            }

            result[field.name] = value;
        }

        return result;
    },
);


function isPureNumberByRegex(str) {
    return /^\d+$/.test(str);
}