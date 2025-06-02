import {Module} from '@nestjs/common';
import {user} from '../Controller/user';


@Module({
    controllers: [user],
    providers: [],
})
export class __user {
}

