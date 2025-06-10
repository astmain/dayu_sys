import {Module} from '@nestjs/common';
import {test1} from './test1';
import {tb_test1} from './test1.entity';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Test1Service} from './test1.service';

@Module({
    controllers: [test1],
    imports: [TypeOrmModule.forFeature([tb_test1])],
    providers: [Test1Service],

})
export class test1_module {
}
