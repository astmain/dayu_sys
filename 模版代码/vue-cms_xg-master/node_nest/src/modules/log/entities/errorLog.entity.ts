import {BaseEntity} from "@/modules/common/entities/base.entity";
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity("g_error_log")
export class ErrorLogEntity extends BaseEntity{
    @PrimaryGeneratedColumn({
        comment:"异常日志",
    })//主键
    id:number;

    @Column({
        type:"longtext",
        nullable:true,
        comment:"错误详情",
    })
    errorDetail: string;

    @Column({
        type:"text",
        nullable:true,
        comment:"请求Url",
    })
    requestUrl: string;

    @Column({
        type:"varchar",
        length:100,
        nullable:true,
        comment:"请求Ip",
    })
    requestIp: string;

    @Column({
        type:"varchar",
        nullable:true,
        comment:"请求方法 POST GET PUT DELETE等",
    })
    requestMethod: string;

    @Column({
        type:"longtext",
        nullable:true,
        comment:"请求参数",
    })
    requestParams: string;

    @Column({
        type:"int",
        nullable:true,
        comment:"用户id",
    })
    uid: number;

    @Column({
        type:"varchar",
        length:100,
        nullable:true,
        comment:"操作系统",
    })
    operationSystem: string;

    @Column({
        type:"varchar",
        length:100,
        nullable:true,
        comment:"浏览器",
    })
    browser: string;

    @Column({
        type:"tinyint",
        nullable:true,
        comment:"pc端还是无线端 1PC端 2无线端 3未知",
    })
    isPcOrIphone: number;
}
