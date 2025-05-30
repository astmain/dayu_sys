import {BaseEntity} from "@/modules/common/entities/base.entity";
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import { statusEnum } from "@/common/enum";

@Entity("g_dic_list")
export class DictEntity extends BaseEntity{
  @PrimaryGeneratedColumn({
    comment:"字典",
  })//主键
  id:number;

  @Column({
    type:"varchar",
    length:100,
    nullable:true,
    comment:"字典名称",
  })
  dictName: string;

  @Column({
    type:"varchar",
    length:100,
    nullable:true,
    comment:"字典值",
  })
  dictValue: string;

  @Column({
    type:"varchar",
    length:100,
    nullable:true,
    comment:"字典类型",
  })
  dictType: string;

  @Column({
    type:"enum",
    nullable:true,
    enum:[statusEnum.start,statusEnum.stop],
    default:statusEnum.start,
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
