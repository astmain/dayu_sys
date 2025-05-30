import { BaseEntity } from "@/modules/common/entities/base.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { statusEnum } from "@/common/enum";
import { Transform } from "class-transformer";

@Entity("g_role_list")
export class RoleEntity extends BaseEntity{
    @PrimaryGeneratedColumn({
        comment:"操作列表",
    })//主键
    id:number;

    @Column({
        type:"varchar",
        length:100,
        comment:"角色名称",
    })
    roleName: string;

    @Column({
        type:"varchar",
        length:200,
        comment:"权限字符",
    })
    perms: string;

    @Column({
        type:"varchar",
        length:200,
        nullable:true,
        comment:"菜单权限",
    })
    menuIds: string;

    @Column({
        type:"varchar",
        length:100,
        nullable:true,
        comment:"备注 角色说明",
    })
    remark: string;

    @Column({
        type:"int",
        nullable:true,
        comment:"排序",
    })
    sort: number

    @Column({
        type:"enum",
        nullable:true,
        enum:[statusEnum.start,statusEnum.stop],
        default:statusEnum.start,
        comment:"状态 1启用 2停用",
    })
    status: number;
}
