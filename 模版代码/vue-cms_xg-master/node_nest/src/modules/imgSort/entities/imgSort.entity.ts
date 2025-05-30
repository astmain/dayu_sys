import {BaseEntity} from "@/modules/common/entities/base.entity";
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Transform } from "class-transformer";

@Entity("g_img_sort")
export class ImgSortEntity extends BaseEntity{
    @PrimaryGeneratedColumn({
        comment:"图片分类",
    })//主键
    id:number;

    @Column({
        type:"varchar",
        length:100,
        nullable:true,
        comment:"分类名称",
    })
    sortName: string;

    @Column({
        type:"int",
        nullable:true,
        comment:"排序",
    })
    sort: number
}
