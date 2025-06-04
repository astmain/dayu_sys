import {Module, Global, DynamicModule} from '@nestjs/common';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient()

interface Opt {
    path: string
}

@Global()
@Module({
    //挂载模块
    imports: [],
    providers: [
        {provide: "db_prisma", useValue: {db_prisma: prisma}},
    ],
    exports: [
        {provide: "db_prisma", useValue: {baseUrl: "/v1"}},
    ],
})


export class db_prisma {
    static make_path(opt: Opt): DynamicModule {
        let result = {
            module: db_prisma,
            providers: [
                {provide: "db_prisma", useValue: prisma},
            ],

        }


        return result

    }
}
