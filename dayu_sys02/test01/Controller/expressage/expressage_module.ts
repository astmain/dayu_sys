import { Module } from '@nestjs/common';
// 自定义
import { expressage } from './expressage';

@Module({
  controllers: [expressage],
  providers: [],

})
export class expressage_module { }

