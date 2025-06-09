import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "@Controller/orm1/user.entity";
import {Repository} from "typeorm";
import {CreateUserDto} from "@Controller/orm1/create-user";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
    ) {
    }

    create(createUserDto: CreateUserDto) {
        return this.usersRepository.save(createUserDto);
    }


}
