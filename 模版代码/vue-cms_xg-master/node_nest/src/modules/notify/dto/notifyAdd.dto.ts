import {IsNotEmpty, IsOptional, IsString} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class NotifyAddDto {

  @ApiProperty({
    description: '公告通知id，如果为空就是自定义内容',
    type:String,
  })
  noticeId:string;

  @ApiProperty({
    description: '发送通知人uid',
    type:String,
  })
  @IsNotEmpty({message:"发送通知人uid不能为空"})
  sendNoticeUid:string;

  @ApiProperty({
    description: '消息通知状态',
    type:Number,
  })
  @IsOptional()
  status:number;

  @ApiProperty({
    description: '通知人的id',
    type:String,
  })
  // @IsNotEmpty({message:"通知人的id不能为空"})
  // @IsString({ message: '通知人的id必须为字符串' })
  notifyUid:string;

  @ApiProperty({
    description: '公告通知标题',
    type:String,
  })
  @IsNotEmpty({message:"公告通知标题不能为空"})
  @IsString({ message: '公告通知标题必须为字符串' })
  title:string;

  @ApiProperty({
    description: '公告通知类型',
    type:String,
  })
  @IsNotEmpty({message:"公告通知不能为空"})
  @IsString({ message: '公告通知必须为字符串' })
  noticeType:string;

  @ApiProperty({
    description: '消息通知内容',
    type:String,
  })
  @IsNotEmpty({message:"消息通知内容不能为空"})
  @IsString({ message: '消息通知内容必须为字符串' })
  content:string;

}
