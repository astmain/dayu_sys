import {BaseEntity} from "@/modules/common/entities/base.entity";
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity("g_sys_config")
export class SysConfigEntity extends BaseEntity{
    @PrimaryGeneratedColumn({
        comment:"系统配置",
    })//主键
    id:number;

    @Column({
        type:"varchar",
        length:200,
        comment:"系统配置类型名",
    })
    key: string;

    @Column({
        type:"longtext",
        comment:"操作内容",
    })
    value: string;

    @Column({
        type:"varchar",
        length:200,
        comment:"描述",
    })
    desc: string;
}
