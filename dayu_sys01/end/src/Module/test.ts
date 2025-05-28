import {MiddlewareConsumer, Module, NestModule, RequestMethod,} from '@nestjs/common';
import {test} from '../Controller/test';

import {Service_test} from '../Service/Service_test';
import {Service_app} from "../Service/Service_app";
import {Config_logger_part_middleware} from "../Config_logger_part_middleware";


@Module({
    controllers: [test],
    providers: [
        Service_test, Service_app,
        {
            provide: 'Service_data',
            useValue: {aaa: 111, bbb: 222},
        },

        {
            provide: 'Service_factory',
            inject: [Service_test],
            useFactory(__Service_test: Service_test) {
                return {obj1: __Service_test, obj2: new Service_test()};
                // return new Service_test();
            }
        },
    ],
})
export class __test implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(Config_logger_part_middleware).forRoutes("test", "app")                          //写法1
        consumer.apply(Config_logger_part_middleware).forRoutes({path: "test", method: RequestMethod.GET})       //写法2
        consumer.apply(Config_logger_part_middleware).forRoutes(test)                                            //写法3
    }
}

