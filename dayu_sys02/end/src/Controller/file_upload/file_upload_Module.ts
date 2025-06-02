import {Module} from '@nestjs/common';
import {file_upload} from './file_upload';


@Module({
    controllers: [file_upload],
    providers: [],
})
export class file_upload_Module {
}

