
import {IsNotEmpty, IsOptional, IsString} from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class NoticeUpdateDto {
    @ApiProperty({
        description: '通知公告id',
        type:Number,
    })
    @IsNotEmpty({ message: '通知公告id不允许为空' })
    id: number;

    //公告标题
    @ApiProperty({
        description: '公告标题',
        type:String,
    })
    @IsNotEmpty({message:"公告标题不能为空"})
    @IsString({ message: '公告标题必须为字符串' })
    title:string;

    //权限字符
    @ApiProperty({
        description: '公告类型',
        type:String,
    })
    @IsNotEmpty({message:"公告类型不能为空"})
    @IsString({ message: '公告类型必须为字符串' })
    noticeType:string;

    @ApiProperty({
        description: '公告内容',
        type:String,
    })
    @IsNotEmpty({message:"公告内容不能为空"})
    @IsString({ message: '公告内容必须为字符串' })
    content:string;

    @ApiProperty({
        description: '状态',
        type:Number,
    })
    @IsNotEmpty({message:"状态不能为空"})
    status:number;

    @ApiProperty({
        description: '创建人id',
        type:Number,
    })
    @IsNotEmpty({message:"创建人id不能为空"})
    createUid:number;
}
