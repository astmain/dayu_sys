import {applyDecorators, Get} from '@nestjs/common';
import {ApiOperation, ApiQuery} from '@nestjs/swagger';

export interface I_item {
    key: string;
    type: any;
    val: any;
    required?: boolean;
    desc?: string;
}

export function Get_form(path: string, summary: string, form: I_item[]) {
    const decorators = [
        Get(path),
        ...form.map(o => ApiQuery({
            name: o.key,
            type: o.type,
            default: o.val,
            required: o.required || false,
            description: o.desc || ""
        }))
    ];


    decorators.unshift(ApiOperation({summary}));


    return applyDecorators(...decorators);
}