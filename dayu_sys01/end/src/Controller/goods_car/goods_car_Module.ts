import {Module} from '@nestjs/common';
import {goods_car} from './goods_car';


@Module({
    controllers: [goods_car],
    providers: [],
})
export class goods_car_Module {
}

