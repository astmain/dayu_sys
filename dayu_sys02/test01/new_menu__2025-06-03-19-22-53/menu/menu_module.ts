import { Module } from '@nestjs/common';
// 自定义
import { menu } from './menu';

@Module({
  controllers: [menu],
  providers: [],

})
export class menu_module { }

