import {HttpException, HttpStatus, Injectable} from '@nestjs/common';

@Injectable()
export  class Service_test {
    getHello(): string {
        return 'getHello-Service_test';
    }

}
