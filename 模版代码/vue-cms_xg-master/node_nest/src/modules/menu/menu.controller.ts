import {
  Controller,
  Get,
  Post,
  Body,
  Headers,
  UseInterceptors
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuAddDto,MenuUpdateDto,MenuListDto,MenuDelDto } from './dto/index';
import {ApiBearerAuth, ApiHeader, ApiOperation, ApiTags} from "@nestjs/swagger";
import {LoggingInterceptor} from "@/common/interceptor/logging.interceptor";
import { operationTypeEnum } from '@/common/enum';

@ApiTags("菜单")
@ApiBearerAuth()
@ApiHeader({
  name: 'X-CSRF-TOKEN',
  description: '请输入token令牌',
})
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}


  @Post("/getRouters")
  @ApiOperation({description:"获取路由"})
  @UseInterceptors(new LoggingInterceptor({data:"获取路由",logType:"operationLog",operationType:operationTypeEnum.search}))
  getRouters() {
    return this.menuService.handleMenuList();
  }

  @Post("/menuList")
  @ApiOperation({description:"菜单栏列表"})
  @UseInterceptors(new LoggingInterceptor({data:"获取菜单栏列表",logType:"operationLog",operationType:operationTypeEnum.search}))
  menuList(@Body() menuListDto: MenuListDto ) {
    return this.menuService.menuList(menuListDto);
  }

  @Post("/menuAdd")
  @ApiOperation({description:"菜单栏添加"})
  @UseInterceptors(new LoggingInterceptor({data:"菜单栏添加",logType:"operationLog",operationType:operationTypeEnum.add}))
  menuAdd(@Body() menuAddDto: MenuAddDto) {
    return this.menuService.menuAdd(menuAddDto);
  }

  @Post('/menuUpdate')
  @ApiOperation({description:"菜单栏编辑"})
  @UseInterceptors(new LoggingInterceptor({data:"菜单栏编辑",logType:"operationLog",operationType:operationTypeEnum.edit}))
  menuUpdate(@Body() MenuUpdateDto: MenuUpdateDto) {
    return this.menuService.menuUpdate(MenuUpdateDto);
  }

  @Post('/menuDel')
  @ApiOperation({description:"菜单栏删除"})
  @UseInterceptors(new LoggingInterceptor({data:"菜单栏删除",logType:"operationLog",operationType:operationTypeEnum.delete}))
  menuDel(@Body() menuDelDto: MenuDelDto) {
    return this.menuService.delete(menuDelDto.id);
  }
  @Get('/curRouters')
  @ApiOperation({description:"获取当前用户的路由"})
  @UseInterceptors(new LoggingInterceptor({data:"获取当前用户的路由",logType:"operationLog",operationType:operationTypeEnum.search}))
  curRouters(@Headers() headers) {
    let token = headers["x-csrf-token"].split("VueCms_xg ")[1];
    return this.menuService.curRouters(token);
  }
}
