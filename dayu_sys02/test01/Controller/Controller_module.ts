import {Module} from "@nestjs/common"
import {DB_prisma} from "../DB_prisma/DB_prisma"
import {files_module} from "@Controller/files/files_module"
import {test1_module} from "@Controller/test1/test1_module"
import {test2_module} from "@Controller/test2/test2_module"
import {user2_module} from "@Controller/user2/user2_module"
import {user3_module} from "@Controller/user3/user3_module"
import {test3_dec_module} from "@Controller/test3_dec/test3_dec"
import {expressage_module} from "@Controller/expressage/expressage_module";


@Module({
    imports: [
        // 工具模块*******************************
        DB_prisma.make_path({path: "/app.json"}),
        // 路由模块*******************************
        files_module,//文件管理
        user2_module,
        user3_module,
        test1_module,
        test2_module,
        test3_dec_module,
        expressage_module,


    ],
    controllers: [],
    providers: [
        // {provide: "test3_dec", useClass: test3_dec}
    ],
})
export class Controller_module {

}
