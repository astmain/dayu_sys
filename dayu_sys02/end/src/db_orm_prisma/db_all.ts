import {Module, Global, DynamicModule} from '@nestjs/common';

import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient()
const typeorm = new PrismaClient()
interface Opt {
    path: string
}
@Global()
@Module({
    //挂载模块
    imports: [],
    providers: [
        // {provide: "db_prisma", useValue: {baseUrl: "/v1"}},
        {provide: "db_all", useValue: {db_prisma:prisma,typeorm:typeorm}},
        // {provide: "db_prisma", useValue: {db_prisma:prisma,db2:db}},
    ],
    exports: [
        {provide: "db_all", useValue: {baseUrl: "/v1"}},
    ],


})


export class db_all {

    static make_path(opt: Opt): DynamicModule {
        return {
            module: db_all,
            providers: [
                {provide: "db_all", useValue: {db1:prisma,db2:typeorm}},
            ],
            // exports: [
            //     {provide: "__db_global", useValue: {baseUrl: "/v1" + opt.path}},
            // ],
        }

    }
}
