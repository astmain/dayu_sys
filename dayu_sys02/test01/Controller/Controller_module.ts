import {Module} from "@nestjs/common"
import {DB_prisma} from "../DB_prisma/DB_prisma"
import {files_module} from "@Controller/files/files_module"
// test
import {test1_module} from "@Controller/test1/test1"
// user
import {user2_module} from "@Controller/user2/user2"
import {user3_module} from "@Controller/user3/user3"
import {user4_module} from "@Controller/user4/user4";


@Module({
    imports: [
        // 工具模块*******************************
        DB_prisma.make_path({path: "/app.json"}),
        // 路由模块*******************************
        // 文件管理
        files_module,
        // test
        test1_module,
        // user
        user2_module,
        user3_module,
        user4_module,


    ],
    controllers: [],
    providers: [
        // {provide: "test3_dec", useClass: test3_dec}
    ],
})
export class Controller_module {

}
