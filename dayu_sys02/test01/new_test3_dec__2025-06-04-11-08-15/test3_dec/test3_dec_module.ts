import { Module } from '@nestjs/common';
// 自定义
import { test3_dec } from './test3_dec';

@Module({
  controllers: [test3_dec],
  providers: [],

})
export class test3_dec_module { }

