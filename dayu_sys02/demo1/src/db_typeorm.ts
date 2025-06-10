import { TypeOrmModule } from '@nestjs/typeorm';
// 引入实体
import * as orm1_dto from '@Controller/orm1/orm1_dto';
import * as test1_dto from '@Controller/test1/test1.entity';


const entities=[
    test1_dto.tb_test1,
    orm1_dto.tb_orm1
]

const conn = TypeOrmModule.forRoot({
    type: 'mysql',
    host: '103.119.2.223',
    port: 3303,
    username: 'root',
    password: '123456',
    database: 'my_db',
    synchronize: true, // 开发环境下使用，生产环境请设置为false
    entities: entities,
})



const db = TypeOrmModule.forFeature(entities)


export const db_typeorm = {
    conn,
    db
}

