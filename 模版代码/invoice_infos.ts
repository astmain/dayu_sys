import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
// 自定义
import * as invoice_infos_DTO from './invoice_infos_DTO';

@ApiTags('发布票管理')
@Controller('invoice_infos')
export class invoice_infos {
  @Post('create')
  @ApiOperation({ summary: '新增发票' })
  create(@Body() body: invoice_infos_DTO.create) {
    console.log(`111---body:`, body);
    return { code: 200, count: 1, message: '成功:新增发票' };
  }

  @Post('del')
  @ApiOperation({ summary: '删除发片' })
  del(@Body() body: invoice_infos_DTO.del) {
    console.log(`111---body:`, body);
    return { code: 200, count: 1, message: '成功:删除发片' };
  }

  @Post('update')
  @ApiOperation({ summary: '更新发票' })
  update(@Body() body: invoice_infos_DTO.update) {
    // create(@Body() body: any) {
    console.log(`111---body:`, body);
    return { code: 200, count: 1, message: '成功:更新发票' };
  }

  @Post('list')
  @ApiOperation({ summary: '查询发票list' })
  list(@Body() body: invoice_infos_DTO.find) {
    console.log(`111---body:`, body);
    return { code: 200, count: 1, message: '成功:查询发票list' };
  }

  @Get('one')
  @ApiOperation({ summary: '查询发票one' })
  one(@Body() body: invoice_infos_DTO.find) {
    console.log(`111---body:`, body);
    return { code: 200, count: 1, message: '成功:查询发票one' };
  }
}
