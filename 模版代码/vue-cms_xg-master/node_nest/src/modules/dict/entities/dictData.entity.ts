import { BaseEntity } from "@/modules/common/entities/base.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { statusEnum } from "@/common/enum";
import { Transform } from "class-transformer";

@Entity("g_dic_data")
export class DictDataEntity extends BaseEntity{
  @PrimaryGeneratedColumn({
    comment:"字典数据",
  })//主键
  id:number;

  @Column({
    type:"int",
    comment:"字典id",
  })
  dictId: number;

  @Column({
    type:"varchar",
    length:100,
    nullable:true,
    comment:"字典标签",
  })
  dictLabel: string;

  @Column({
    type:"varchar",
    length:100,
    nullable:true,
    comment:"字典键值",
  })
  dictValue: string;

  @Column({
    type:"tinyint",
    nullable:true,
    default:1,
    comment:"字典数据排序",
  })
  dictSort: number

  @Column({
    type:"varchar",
    length:100,
    nullable:true,
    comment:"字典数据样式",
  })
  listClass: string;

  @Column({
    type:"enum",
    enum:[statusEnum.stop,statusEnum.start],
    default:statusEnum.start,
    nullable:true,
    comment:"状态 1启用 2停用",
  })
  status: number;

  @Column({
    type:"varchar",
    length:100,
    nullable:true,
    comment:"备注",
  })
  remark: string;
}
