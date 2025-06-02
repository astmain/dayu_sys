
import { Module } from '@nestjs/common';
// 自定义
import { user2 } from './user2';

@Module({
  controllers: [user2],
  providers: [],

})
export class user2_module { }

