import {Module} from '@nestjs/common';
import {restfull01} from './restfull01';
import {tb_restfull01} from './tb_restfull01';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Test1Service} from './restfull01_service';

@Module({
    controllers: [restfull01],
    imports: [TypeOrmModule.forFeature([tb_restfull01])],
    providers: [Test1Service],

})
export class restfull01_module {
}
