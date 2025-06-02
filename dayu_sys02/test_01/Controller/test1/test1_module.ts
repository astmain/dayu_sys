
import { Module } from '@nestjs/common';
// 自定义
import { test1 } from './test1';

@Module({
  controllers: [test1],
  providers: [],

})
export class test1_module { }

