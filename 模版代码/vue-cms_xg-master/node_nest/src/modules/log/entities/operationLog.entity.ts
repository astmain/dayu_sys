import { BaseEntity } from "@/modules/common/entities/base.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { loginStatusEnum } from "@/common/enum";

@Entity("g_operation_log")
export class OperationLogEntity extends BaseEntity{
    @PrimaryGeneratedColumn({
        comment:"操作日志",
    })//主键
    id:number;

    @Column({
        type:"varchar",
        length:"255",
        nullable:true,
        comment:"用户操作具体内容",
    })
    operationContent: string;

    @Column({
      type:"tinyint",
      nullable:false,
      comment:"操作类型 1添加 2删除 3查询 4修改 5其他",
    })
    operationType: number;

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
        comment:"响应参数",
    })
    respondParams: string;

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

    @Column({
        type:"enum",
        nullable:true,
        default:loginStatusEnum.fail,
        enum:[loginStatusEnum.success,loginStatusEnum.fail],
        comment:"操作相应状态 1成功 2失败",
    })
    status: number;

}
