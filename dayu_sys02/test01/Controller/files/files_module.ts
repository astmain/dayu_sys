import { Module } from '@nestjs/common';
// 自定义
import { files } from './files';


@Module({
  imports: [],
  controllers: [files],
  providers: [],

})
export class files_module { }

