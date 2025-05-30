import {BaseEntity} from "@/modules/common/entities/base.entity";
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Transform } from "class-transformer";

@Entity('g_art_column')
export class ArtColumnEntity extends BaseEntity{
    @PrimaryGeneratedColumn({
        comment:"文章栏目",
    })//主键
    id:number;

    @Column({
        type:"varchar",
        length:100,
        nullable:true,
        comment:"栏目名称",
    })
    columnName: string;

    @Column({
        type:"int",
        nullable:true,
        comment:"排序",
    })
    sort: number
}
