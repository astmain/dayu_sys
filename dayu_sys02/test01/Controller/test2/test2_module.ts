import { Module } from '@nestjs/common';
// 自定义
import { test2 } from './test2';
import { PrismaModule } from '../../Orm/PrismaModule';

@Module({
  imports: [PrismaModule],
  controllers: [test2],
  providers: [],

})
export class test2_module { }

