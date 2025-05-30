import {BaseEntity} from "@/modules/common/entities/base.entity";
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import { statusEnum } from "@/common/enum";
import { Transform } from "class-transformer";

@Entity('g_art_list')
export class ArtEntity extends BaseEntity{
    @PrimaryGeneratedColumn({
        comment:"文章列表",
    })//主键
    id:number;

    @Column({
        type:"varchar",
        length:100,
        nullable:true,
        comment:"文章名称",
    })
    artName: string;

    @Column({
        type:"varchar",
        length:200,
        nullable:true,
        comment:"文章关键词，以逗号隔开",
    })
    artKey: string;

    @Column({
        type:"varchar",
        length:200,
        nullable:true,
        comment:"简短介绍",
    })
    artDesc: string;

    @Column({
        type:"longtext",
        nullable:true,
        comment:"文章内容",
    })
    artContent: string;

    @Column({
        type:"varchar",
        length:255,
        nullable:true,
        comment:"文章内容文件id",
    })
    artContentId: string;

    @Column({
        type:"text",
        nullable:true,
        comment:"原始路径",
    })
    originalUrl: string;

    @Column({
        type:"int",
        nullable:true,
        comment:"文章栏目id",
    })
    artColumnId: number;

    @Column({
        type:"int",
        nullable:true,
        comment:"文章类型id",
    })
    artSortId: number;

    @Column({
        type:"int",
        nullable:true,
        comment:"图片id",
    })
    picId: number;

    @Column({
        type:"enum",
        enum:[statusEnum.start,statusEnum.stop],
        default:statusEnum.start,
        nullable:true,
        comment:"显示状态    1.显示，2.不显示",
    })
    status: number;

    @Column({
        type:"int",
        default:1,
        nullable:true,
        comment:"排序",
    })
    sort: number

    @Column({
        type:"int",
        default:1,
        nullable:true,
        comment:"访问量",
    })
    visitNum: number;
}
