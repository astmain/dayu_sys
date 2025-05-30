import {Controller,Post, Body, UseInterceptors} from "@nestjs/common";
import { RoleService } from './role.service';
import {RoleAddDto, RoleDelDto, RoleListDto, RoleUpdateDto} from './dto';
import {ApiBearerAuth, ApiHeader, ApiOperation, ApiTags} from "@nestjs/swagger";
import {LoggingInterceptor} from "@/common/interceptor/logging.interceptor";
import { operationTypeEnum } from '@/common/enum';

@ApiTags("用户角色")
@ApiBearerAuth()
@ApiHeader({
  name: 'X-CSRF-TOKEN',
  description: '请输入token令牌',
})
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService
              ) {}
    @Post("/roleList")
    @ApiOperation({description:"角色列表"})
    @UseInterceptors(new LoggingInterceptor({data:"获取角色列表",logType:"operationLog",operationType:operationTypeEnum.search}))
    roleList(@Body() roleListDto: RoleListDto ) {
        return this.roleService.roleList(roleListDto);
    }

    @Post("/roleAdd")
    @ApiOperation({description:"角色添加"})
    @UseInterceptors(new LoggingInterceptor({data:"角色添加",logType:"operationLog",operationType:operationTypeEnum.add}))
    roleAdd(@Body() roleAddDto: RoleAddDto) {
        return this.roleService.roleAdd(roleAddDto);
    }

    @Post('/roleUpdate')
    @ApiOperation({description:"角色更新"})
    @UseInterceptors(new LoggingInterceptor({data:"角色更新",logType:"operationLog",operationType:operationTypeEnum.edit}))
    roleUpdate(@Body() roleUpdateDto: RoleUpdateDto) {
        return this.roleService.roleUpdate(roleUpdateDto);
    }

    @Post('/roleDel')
    @ApiOperation({description:"角色删除"})
    @UseInterceptors(new LoggingInterceptor({data:"角色删除",logType:"operationLog",operationType:operationTypeEnum.delete}))
    roleDel(@Body() roleDel: RoleDelDto) {
        return this.roleService.delete(roleDel.id);
    }


    @Post("/changeRoleStatus")
    @ApiOperation({description:"修改角色状态"})
    @UseInterceptors(new LoggingInterceptor({data:"修改角色状态",logType:"operationLog",operationType:operationTypeEnum.edit}))
    changeRoleStatus(@Body("id") id: number,@Body("status") status:string|number) {
        return this.roleService.changeRoleStatus(id,status);
    }
}
