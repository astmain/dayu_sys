import {BaseEntity} from "@/modules/common/entities/base.entity";
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('g_art_content_file')
export class ArtContentFileEntity extends BaseEntity{
    @PrimaryGeneratedColumn({
        comment:"文章内容文件列表",
    })//主键
    id:number;

    @Column({
        type:"text",
        nullable:true,
        comment:"文件名",
    })
    fileName: string;

    @Column({
        type:"int",
        nullable:true,
        comment:"类型 1图片 2文件 3视频",
    })
    type: number;

    @Column({
        type:"int",
        nullable:true,
        default:1,
        comment:"状态 1临时(定时任务可删除) 2已保存(不可删除)",
    })
    status: number;
}
