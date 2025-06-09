// 帮我在项目中集成typeorm 使用sqlite


import {TypeOrmModule} from '@nestjs/typeorm';
import {Module} from "@nestjs/common";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'db.sql',
            autoLoadEntities: true,
            synchronize: true,
        }),
    ],
})


export class DB_typeorm {
}
