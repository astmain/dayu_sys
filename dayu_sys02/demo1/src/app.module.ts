import { Module } from '@nestjs/common';

// 引入控制器
import { orm1 } from '@Controller/orm1/orm1';
import { orm2 } from '@Controller/orm2/orm2';
import { restfull01_module } from '@Controller/restfull01/restfull01_module';
// 引入数据库
import { db_typeorm } from './db_typeorm';

@Module({
    imports: [
        db_typeorm.conn,
        db_typeorm.db,
        restfull01_module,
    ],
    controllers: [
        orm1, 
        orm2,
    ],
})
export class AppModule {
}
