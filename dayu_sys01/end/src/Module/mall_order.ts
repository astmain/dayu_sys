import {Module} from '@nestjs/common';
import {mall_order} from '../Controller/mall_order';


@Module({
    controllers: [mall_order],
    providers: [],
})
export class __mall_order {
}

