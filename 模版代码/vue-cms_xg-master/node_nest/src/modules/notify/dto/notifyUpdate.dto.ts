
import {IsNotEmpty, IsOptional, IsString} from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class NotifyUpdateDto {
    @ApiProperty({
        description: '消息通知id',
        type:Number,
    })
    @IsNotEmpty({ message: 'id不允许为空' })
    id: number;

    @ApiProperty({
        description: '发送通知人uid',
        type:Number,
    })
    @IsNotEmpty({message:"发送通知人uid不能为空"})
    sendNoticeUid:number;

    @ApiProperty({
        description: '消息通知状态',
        type:Number,
    })
    @IsNotEmpty({message:"消息通知状态不能为空"})
    status:number;

    @ApiProperty({
        description: '消息通知内容',
        type:String,
    })
    @IsNotEmpty({message:"消息通知内容不能为空"})
    @IsString({ message: '消息通知内容必须为字符串' })
    content:string;

}
