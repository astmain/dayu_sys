import { Module } from '@nestjs/common';
import { Test1Controller } from './test1.controller';
import { tb_test1 } from './test1.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test1Service } from './test1.service';

@Module({
    imports: [TypeOrmModule.forFeature([tb_test1])],
    controllers: [Test1Controller],
    providers: [Test1Service],

})
export class test1_module {
}
