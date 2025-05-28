import {HttpException, HttpStatus, Injectable} from '@nestjs/common';

@Injectable()
export class Service_app {
    getHello(): string {
        return 'getHello-Service_app';
    }

}
