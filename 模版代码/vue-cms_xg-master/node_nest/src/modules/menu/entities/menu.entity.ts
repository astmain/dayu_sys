import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from 'typeorm';
import { BaseEntity } from '@/modules/common/entities/base.entity';
import { menuTypeEnum, otherStatusEnum, statusEnum } from "@/common/enum";
import { Transform } from "class-transformer";

@Entity("g_menu_list")
export class MenuEntity extends BaseEntity{

  @PrimaryGeneratedColumn({
    comment:"菜单列表",
  })//主键
  id:number;

  @Column({
    type:"int",
    default:0,
    comment:"父级id",
  })
  pid:number

  @Column({
    type:"enum",
    enum:[menuTypeEnum.directory,menuTypeEnum.menu,menuTypeEnum.button],
    default:menuTypeEnum.directory,
    comment:"菜单类型 1.目录，2.菜单，3.按钮",
  })
  menuType: number;

  @Column({
    type:"varchar",
    length:100,
    nullable:true,
    comment:"菜单名称",
  })
  menuName: string;

  @Column({
    type:"varchar",
    length:100,
    nullable:true,
    comment:"图标",
  })
  icon: string;

  @Column({
    type:"varchar",
    length:100,
    nullable:true,
    comment:"权限字符",
  })
  perms: string;

  @Column({
    type:"varchar",
    length:255,
    nullable:true,
    comment:"组件路径",
  })
  component: string;

  @Column({
    type:"varchar",
    length:255,
    nullable:true,
    comment:"路由地址",
  })
  path: string;

  @Column({
    type:"enum",
    enum:[statusEnum.start,statusEnum.stop],
    default:statusEnum.start,
    nullable:true,
    comment:"显示状态    1.显示，2.不显示",
  })
  visible: number;

  @Column({
    type:"enum",
    enum:[statusEnum.start,statusEnum.stop],
    default:statusEnum.start,
    nullable:true,
    comment:"菜单显示状态    1.显示，2.不显示",
  })
  status: number;

  @Column({
    type:"enum",
    enum:[otherStatusEnum.yes,otherStatusEnum.no],
    default:otherStatusEnum.no,
    nullable:true,
    comment:"是否外链    1.是，2.不是",
  })
  isFrame: number;

  @Column({
    type:"enum",
    enum:[otherStatusEnum.yes,otherStatusEnum.no],
    default:otherStatusEnum.no,
    nullable:true,
    comment:"是否缓存    1.缓存，2.不缓存",
  })
  isCache: number;

  @Column({
    type:"int",
    nullable:true,
    comment:"排序",
  })
    sort: number

}
