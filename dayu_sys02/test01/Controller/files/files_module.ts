import { Module } from '@nestjs/common';
// 自定义
import { files } from './files';
import { PrismaModule } from '../../Orm/PrismaModule';

@Module({
  imports: [PrismaModule],
  controllers: [files],
  providers: [],

})
export class files_module { }

