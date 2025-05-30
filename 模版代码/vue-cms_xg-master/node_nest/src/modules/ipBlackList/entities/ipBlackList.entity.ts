import {BaseEntity} from "@/modules/common/entities/base.entity";
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Transform } from "class-transformer";

@Entity('g_ip_black_list')
export class IpBlackListEntity extends BaseEntity{
    @PrimaryGeneratedColumn({
        comment:"ip 黑名单",
    })//主键
    id:number;

    @Column({
        type:"varchar",
        length:100,
        nullable:true,
        comment:"ip",
    })
    ip: string;

    @Column({
        type:"int",
        nullable:true,
        comment:"排序",
    })
    @Transform(({ value }) => {
        if(!value){
            return 0;
        }
        return value;
    })
    sort: number
}
