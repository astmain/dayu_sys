import {Module} from "@nestjs/common"
import {files_module} from "@Controller/files/files_module"
import {test1_module} from "@Controller/test1/test1_module"
import {test2_module} from "@Controller/test2/test2_module"
import {user2_module} from "@Controller/user2/user2_module"
import {test3_dec_module} from "@Controller/test3_dec/test3_dec"


import {PrismaModule} from "../Orm/PrismaModule"
import {db_prisma} from "../Orm/db_prisma";


@Module({
    imports: [
        db_prisma.make_path({path: "/app.json"}),
        PrismaModule,

        files_module,
        user2_module,

        test1_module,
        test2_module,

        test3_dec_module,


    ],
    controllers: [],
    providers: [],
})
export class Controller_module {

}
