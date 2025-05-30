import { Module } from '@nestjs/common';
import { DictService } from './dict.service';
import { DictController } from './dict.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DictEntity } from './entities/dict.entity';
import { DictDataEntity } from './entities/dictData.entity';

@Module({
  imports:[TypeOrmModule.forFeature([DictEntity,DictDataEntity])],
  controllers: [DictController],
  providers: [DictService]
})
export class DictModule {}
