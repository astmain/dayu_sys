import {Module} from "@nestjs/common"
import {files_module} from "./Controller/files/files_module"
import {test1_module} from "./Controller/test1/test1_module"
import {test2_module} from "./Controller/test2/test2_module"
import {user2_module} from "./Controller/user2/user2_module"


import {PrismaModule} from "./Orm/PrismaModule"

@Module({
    imports: [
        PrismaModule,
        
        files_module, test1_module, test2_module, user2_module,],
    controllers: [],
    providers: [],
})
export class main_module {

}
