import {Module, Global, DynamicModule} from '@nestjs/common';

// @ts-ignore
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
        {provide: "db_prisma", useValue: {db_prisma: prisma, typeorm: typeorm}},
        // {provide: "db_prisma", useValue: {db_prisma:prisma,db2:db}},
    ],
    exports: [
        {provide: "db_prisma", useValue: {baseUrl: "/v1"}},
    ],


})


export class db_prisma {

    static make_path(opt: Opt): DynamicModule {

        let aaa = {
            module: db_prisma,
            providers: [
                {provide: "db_prisma", useValue: prisma},
            ],
            // exports: [
            //     {provide: "__db_global", useValue: {baseUrl: "/v1" + opt.path}},
            // ],
        }


        return aaa

    }
}
