import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class OperationLogAddDto {
    @ApiProperty({
        description: '用户id',
        type:String,
    })
    @IsNotEmpty({ message: '用户id' })
    uid: string|number;

    @ApiProperty({
        description: '请求参数',
        type:String,
    })
    requestParams?: string;

    @ApiProperty({
        description: '用户操作具体内容',
        type:String,
    })
    operationContent?: string;

    @ApiProperty({
        description: '请求Url',
        type:String,
    })
    requestUrl: any;

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
    respondParams: string;

    @ApiProperty({
        description: '操作系统',
        type:String,
    })
    operationSystem: string;

    @ApiProperty({
        description: '操作浏览器',
        type:String,
    })
    browser: any;

    @ApiProperty({
        description: '电话操作，手机操作',
        type:Number,
    })
    @IsInt()
    isPcOrIphone: number;

    @ApiProperty({
        description: '操作类型',
        type:Number,
    })
    @IsInt()
    operationType: number;

    // @ApiProperty({
    //     description: '添加时间',
    //     type:String,
    // })
    // addTime: string|number;
}
