/*- coding = utf-8 -*-
@Time : 2023/5/16 11:55
@Author : 管茂良
@File : events.module.ts
@web  : www.php-china.com
@Software: WebStorm
*/

import {Module} from "@nestjs/common";
import {EventsGateway} from "@/events/events.gateway";

@Module({
    providers:[EventsGateway],
    exports:[EventsGateway]
})
export class EventsModule{}