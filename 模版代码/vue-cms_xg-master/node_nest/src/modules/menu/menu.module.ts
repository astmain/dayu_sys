import { forwardRef, Module } from "@nestjs/common";
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuEntity } from './entities/menu.entity';
import { UserEntity } from "@/modules/user/entities/user.entity";
import { AuthModule } from "@/modules/auth/auth.module";
import { RoleEntity } from "@/modules/role/entities/role.entity";

@Module({
  imports:[TypeOrmModule.forFeature([MenuEntity,UserEntity,RoleEntity]),forwardRef(()=>AuthModule)],
  controllers: [MenuController],
  providers: [MenuService]
})
export class MenuModule {}
