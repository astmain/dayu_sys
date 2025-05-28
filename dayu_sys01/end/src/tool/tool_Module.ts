import {Module, Global, DynamicModule} from '@nestjs/common';

import tool from "./index"

interface Opt {
    path: string
}





@Global()
@Module({
    //挂载模块
    imports: [],
    providers: [
        {provide: "tool", useValue: tool},
    ],
    exports: [
        {provide: "tool", useValue:tool},
    ],
})


export class tool_Module {


}
