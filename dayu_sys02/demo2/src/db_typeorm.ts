import { TypeOrmModule } from '@nestjs/typeorm';
// 引入实体
import * as orm1_dto from '@Controller/orm1/orm1_dto';
import * as dto_111 from '@Controller/restfull01/tb_restfull01';


const entities = [
    dto_111.tb_restfull01,
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

