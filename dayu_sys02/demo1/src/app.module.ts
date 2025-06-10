import {Module} from '@nestjs/common';

// 引入控制器
import {orm1} from '@Controller/orm1/orm1';
import {test1_module} from '@Controller/test1/test1_module';
// 引入数据库
import {db_typeorm} from './db_typeorm';

@Module({
    imports: [
        db_typeorm.conn,
        db_typeorm.db,
        test1_module,
    ],
    controllers: [
        orm1
    ],
})
export class AppModule {
}
