import {forwardRef, HttpException, HttpStatus, Inject, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {TaskSchedulingEntity} from './entities/taskScheduling.entity';
import {getConnection, Repository} from 'typeorm';
import {
  handleCurTime,
  handleDealIpv6ToIpv4,
  handleFilterObjectEmptyData,
  handleReplaceSpecialChar,
  securityMd5
} from "@/utils/utils";
import {AuthService} from '../auth/auth.service';
import {TaskSchedulingAddDto, TaskSchedulingDto, TaskSchedulingUpdateDto} from "./dto";
import {MsgService} from "@/modules/common/msg/msg.service";
import {RoleEntity} from "@/modules/role/entities/role.entity";
import {SysConfigEntity} from "@/modules/sysConfig/entities/sysConfig.entity";
import {ImgEntity} from "@/modules/img/entities/img.entity";
import { MenuEntity } from '@/modules/menu/entities/menu.entity';
import { commonEnum, permsEnum, redisEnum, userLoginStatusEnum, userTypeEnum } from "@/common/enum";
import { RedisInstance } from "@/common/redis";

@Injectable()
export class TaskSchedulingService {
  constructor(
      //依赖注入
      @InjectRepository(TaskSchedulingEntity) private readonly userEntity:Repository<TaskSchedulingEntity>,
      @InjectRepository(RoleEntity) private readonly roleEntity:Repository<RoleEntity>,
      @InjectRepository(SysConfigEntity) private readonly sysConfigEntity:Repository<SysConfigEntity>,
      @InjectRepository(ImgEntity) private readonly imgEntity:Repository<ImgEntity>,
      @InjectRepository(MenuEntity) private readonly menuEntity:Repository<MenuEntity>,
      @Inject(forwardRef(() => AuthService)) private readonly authService:AuthService,
      private readonly msgService:MsgService
  ) {}


}
