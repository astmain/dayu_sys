import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtColumnModule } from './modules/artColumn/artColumn.module';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { ArtSortModule } from './modules/artSort/artSort.module';
import { ArtModule } from './modules/art/art.module';
import { ImgSortModule } from './modules/imgSort/imgSort.module';
import { ImgModule } from './modules/img/img.module';
import { MenuModule } from './modules/menu/menu.module';
import { DictModule } from './modules/dict/dict.module';
import { LogModule } from './modules/log/log.module';
import { HomeModule } from './modules/home/home.module';
import { AuthModule } from './modules/auth/auth.module';
import { SysConfigModule } from './modules/sysConfig/sysConfig.module';
import { handleMyConfig, statusMonitorConfig } from '@/utils/config';
import { MsgModule } from './modules/common/msg/msg.module';
import { extname, join } from 'path';
import {ServeStaticModule} from "@nestjs/serve-static";
import { NotifyModule } from "@/modules/notify/notify.module";
import { NoticeModule } from "@/modules/notice/notice.module";
import { IpBlackListModule } from "@/modules/ipBlackList/ipBlackList.module";
import { ThrottlerModule } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core";
import { RateLimitGuard } from "@/common/guard/rateLimit.guard";
import {EventsModule} from "@/events/events.module";
import {TasksModule} from "@/tasks/tasks.module";
import { ScheduleModule } from '@nestjs/schedule';
import { StatusMonitorModule } from "@/modules/statusMonitor/statusMonitor.module";

let mysql =  TypeOrmModule.forRoot(handleMyConfig());

// ImgModule,ArtModule,DictModule
@Module({
  //nestjs设置静态资源访问
  //ip+端口号/static/图片名称.png(jpg)
  //https://juejin.cn/post/7186683352467832869
  imports: [ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'public/uploads'),
    serveRoot: '/static',
  },
      {
        rootPath: join(__dirname, '..', 'public/css'),
        serveRoot: '/css',
      }),
    ThrottlerModule.forRoot({
      ttl: 2,  //2秒
      limit: process.env.NODE_ENV !== 'pro'?9999:15, //请求2次
    }),
    ScheduleModule.forRoot(),
    TasksModule,
    EventsModule,
    // StatusMonitorModule.setUp(statusMonitorConfig),
    mysql,StatusMonitorModule,IpBlackListModule,NotifyModule,NoticeModule,HomeModule,MsgModule,ArtColumnModule,SysConfigModule, UserModule, RoleModule,DictModule,ImgModule,ArtModule, MenuModule, ImgSortModule, ArtSortModule, LogModule, AuthModule],
  controllers: [AppController],
  providers: [AppService,{
    provide: APP_GUARD,
    useClass: RateLimitGuard,
  },],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    // consumer.apply(ReqMiddleware).forRoutes("/")
  }
}
