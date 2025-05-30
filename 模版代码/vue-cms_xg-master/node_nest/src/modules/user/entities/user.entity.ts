//*- coding = utf-8 -*-
//@Time : 2022-11-03 22:17
//@Author : 沉默小管
//@File : user.model.js
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsEmail } from "class-validator";
import { BaseEntity } from "@/modules/common/entities/base.entity";
import { sexEnum, statusEnum, userTypeEnum } from "@/common/enum";
import { Transform } from "class-transformer";

@Entity('g_user_list')
export class UserEntity extends BaseEntity{

  @PrimaryGeneratedColumn({
    comment:"用户列表",
  })//自增主键
  id:number;

  @Column({
    type:"int",
    nullable:true,
    comment:"头像图片id",
  })
  headImgId: number;

  @Column({
    type:"varchar",
    length:100,
    nullable:true,
    comment:"名称 默认账号",
  })
  nickName: string;

  @Column({
    type:"varchar",
    length:100,
    nullable:true,
    comment:"账号",
  })
  username: string;

  @Column({
    type:"varchar",
    length:100,
    nullable:true,
    comment:"密码",
  })
  password: string;

  @Column({
    type:"varchar",
    length:255,
    nullable:true,
    comment:"原始密码",
  })
  originalPwd: string;

  @IsEmail()
  @Column({
    type:"varchar",
    length:50,
    nullable:true,
    comment:"邮箱",
  })
  email: string;

  @Column({
    type:"varchar",
    length:50,
    nullable:true,
    comment:"关联的qq账号,unionid是qq平台统一ID信息",
  })
  qqId: string;

  @Column({
    type:"varchar",
    length:50,
    nullable:true,
    comment:"qq名称",
  })
  qqNickname: string;

  @Column({
    type:"varchar",
    length:50,
    nullable:true,
    comment:"关联的gitee账号id",
  })
  giteeId: string;

  @Column({
    type:"varchar",
    length:50,
    nullable:true,
    comment:"gitee名称",
  })
  giteeNickname: string;

  @Column({
    type:"varchar",
    length:15,
    nullable:true,
    comment:"电话号码",
  })
  phone: string;

  @Column({
    type:"enum",
    enum:[sexEnum.man,sexEnum.female,sexEnum.unknown],
    default:sexEnum.unknown,
    comment:"性别 1男 2女 3未知",
  })
  sex: number;

  @Column({
    type:"enum",
    enum:[statusEnum.start,statusEnum.stop],
    nullable:true,
    default:statusEnum.start,
    comment:"状态 1启用 2停用",
  })
  status: number;

  @Column({
    type:"varchar",
    length:100,
    nullable:true,
    comment:"登录ip",
  })
  loginIp: string;

  @Column({
    type:"varchar",
    length:100,
    nullable:true,
    comment:"浏览器",
  })
  loginBrowser: string;

  @Column({
    type:"varchar",
    length:100,
    nullable:true,
    comment:"操作系统",
  })
  loginSystem: string;

  @Column({
    type:"varchar",
    length:100,
    nullable:true,
    comment:"登录时间",
  })
  loginTime: string;

  @Column({
    type:"varchar",
    length:255,
    nullable:true,
    comment:"通过jwt生成token，拿token里的过期时间判断是否在线，jwt生成添加电脑的唯一标识(mac)",
  })
  token: string;

  @Column({
    type:"enum",
    enum:[userTypeEnum.testType,userTypeEnum.formalType],
    default:userTypeEnum.formalType,
    nullable:true,
    comment:"账号类型 1测试类型 2正常类型",
  })
  userType: number;

  @Column({
    type:"int",
    nullable:true,
    comment:"角色id",
  })
  roleId: number;

  @Column({
    type:"int",
    nullable:true,
    comment:"排序",
  })
    sort: number


}
