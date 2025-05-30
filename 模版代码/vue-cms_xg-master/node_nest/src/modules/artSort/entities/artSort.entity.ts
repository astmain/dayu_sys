import {BaseEntity} from "@/modules/common/entities/base.entity";
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Transform } from "class-transformer";

@Entity('g_art_sort')
export class ArtSortEntity extends BaseEntity{
    @PrimaryGeneratedColumn({
        comment:"文章类型",
    })//主键
    id:number;

    @Column({
        type:"varchar",
        length:100,
        nullable:true,
        comment:"类型名称",
    })
    artSortName: string;

    @Column({
        type:"int",
        nullable:true,
        comment:"排序",
    })
    sort: number
}
