import {IsNotEmpty, IsOptional} from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
import { BaseDto } from '@/modules/common/dto/base.dto';

export class ErrorLogAddDto extends BaseDto{
    @ApiProperty({
        description: '用户id',
        type:Number,
    })
    uid: string|number;

    @ApiProperty({
        description: '请求参数',
        type:String,
    })
    requestParams?: string;

    @ApiProperty({
        description: '请求Url',
        type:String,
    })
    requestUrl: string;

    @ApiProperty({
        description: '请求Ip',
        type:String,
    })
    requestIp: string;

    @ApiProperty({
        description: '请求方法 POST GET PUT DELETE等',
        type:String,
    })
    requestMethod: any;

    @ApiProperty({
        description: '响应参数',
        type:String,
    })
    respondParams?: string;

    @ApiProperty({
        description: '报错详情',
        type:String,
    })
    errorDetail: string;
}
