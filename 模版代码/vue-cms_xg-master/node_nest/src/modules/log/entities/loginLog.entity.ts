import { BaseEntity } from "@/modules/common/entities/base.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { loginStatusEnum } from "@/common/enum";

@Entity('g_log_log')
export class LoginLogEntity extends BaseEntity{
    @PrimaryGeneratedColumn({
        comment:"登陆日志",
    })//主键
    id:number;

    @Column({
        type:"varchar",
        length:100,
        nullable:true,
        comment:"访问ip",
    })
    ip: string;

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
        comment:"pc端还是无线端",
    })
    isPcOrIphone: number;

    @Column({
        type:"int",
        nullable:true,
        comment:"用户id -1为登录失败，添加失败的账号密码 大于1登录成功",
    })
    uid: number;

    @Column({
        type:"varchar",
        length:100,
        nullable:true,
        comment:"账号",
    })
    username: string;

    @Column({
        type:"varchar",
        length:100,
        nullable:true,
        comment:"密码",
    })
    password: string;


    @Column({
        type:"enum",
        enum:[loginStatusEnum.success,loginStatusEnum.fail],
        nullable:true,
        default:loginStatusEnum.success,
        comment:"状态 1成功 2失败",
    })
    status: number;

    @Column({
        type:"int",
        nullable:true,
        comment:"角色Id",
    })
    roleId: number;
}
