import {Module} from '@nestjs/common';
import {goods_order} from './goods_order';


@Module({
    controllers: [goods_order],
    providers: [],
})
export class goods_order_Module {
}

