import {Controller, Get, Post, Body, Delete, Param} from '@nestjs/common';
import {UsersService} from './users.service';
import {User} from './entities/user.entity';

@Controller('users')
export class UsersController {


    @Post()
    async create(@Body() userData: Partial<User>) {
        return;
    }


}