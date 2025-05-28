import {Module, Global, DynamicModule} from '@nestjs/common';

interface Opt {
    path: string
}


@Global()
@Module({
    //挂载模块
    imports: [],

    providers: [
        {provide: "global_module", useValue: {baseUrl: "/v1"}},
    ],
    exports: [
        {provide: "global_module", useValue: {baseUrl: "/v1"}},


    ],


})


export class global_module {

    static make_path(opt: Opt): DynamicModule {
        return {
            module: global_module,
            providers: [
                {provide: "global_module", useValue: {baseUrl: "/v1" + opt.path}},
            ],
            exports: [
                {provide: "global_module", useValue: {baseUrl: "/v1" + opt.path}},
            ],
        }

    }
}
