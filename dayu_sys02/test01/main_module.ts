import { Module } from "@nestjs/common"
import { test1_module } from "./Controller/test1/test1_module"
import { test2_module } from "./Controller/test2/test2_module"
import { user2_module } from "./Controller/user2/user2_module"

@Module({
  imports: [test1_module,test2_module, user2_module],
    controllers: [],
  providers: [],
})
export class main_module {

}
