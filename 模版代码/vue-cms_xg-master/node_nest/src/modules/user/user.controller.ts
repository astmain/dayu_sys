import {
  Controller,
  Post,
  Body,
  HttpException, HttpStatus, UseInterceptors, Get, Res, Req, Param, Query,
} from '@nestjs/common';
import {ApiBearerAuth, ApiBody, ApiHeader, ApiOperation, ApiTags} from '@nestjs/swagger';
import { UserService } from './user.service';
import {
  LoginDto,
  UserListDto,
  UserUpdateDto,
  UserAddDto,
  UserDelDto,
  OnlineUserListDto,
  GiteeLoginDto, QqLoginDto,
} from './dto/index';
import {LoggingInterceptor} from "@/common/interceptor/logging.interceptor";
import { operationTypeEnum } from '@/common/enum';
import {IpAddress} from "@/utils/utils";
import { Response } from 'express';
import { NoAuth } from '@/common/decorator/noAuth.decorator';

@ApiTags("用户列表")
@Controller("user")
export class UserController {

  constructor(private readonly userService:UserService) {

  }

  //apiBody怎么用？
  @ApiBody({type:UserListDto})
  @ApiBearerAuth()
  @ApiHeader({
    name: 'X-CSRF-TOKEN',
    description: '请输入token令牌',
  })
  @Post("/userList")
  @ApiOperation({description:"用户列表"})
  @UseInterceptors(new LoggingInterceptor({data:"获取用户列表",logType:"operationLog",operationType:operationTypeEnum.search}))
  userList(@Body() userListDto:UserListDto){
    return this.userService.userList(userListDto);
  }

  @Post("/userUpdate")
  @ApiBearerAuth()
  @ApiHeader({
    name: 'X-CSRF-TOKEN',
    description: '请输入token令牌',
  })
  @ApiOperation({description:"用户更新"})
  @UseInterceptors(new LoggingInterceptor({data:"用户更新",logType:"operationLog",operationType:operationTypeEnum.edit}))
  userUpdate(@Body() userUpdateDto: UserUpdateDto) {
    return this.userService.userUpdate(userUpdateDto);
  }

  @Post("/userDel")
  @ApiBearerAuth()
  @ApiHeader({
    name: 'X-CSRF-TOKEN',
    description: '请输入token令牌',
  })
  @ApiOperation({description:"用户删除"})
  @UseInterceptors(new LoggingInterceptor({data:"用户删除",logType:"operationLog",operationType:operationTypeEnum.delete}))
  userDel(@Body() userDelDto: UserDelDto) {
    return this.userService.delete(userDelDto.id);
  }

  @Post("/userAdd")
  @ApiBearerAuth()
  @ApiHeader({
    name: 'X-CSRF-TOKEN',
    description: '请输入token令牌',
  })
  @ApiOperation({description:"用户添加"})
  @UseInterceptors(new LoggingInterceptor({data:"用户添加",logType:"operationLog",operationType:operationTypeEnum.add}))
  userAdd(@Body() userAddDto: UserAddDto) {
    return this.userService.userAdd(userAddDto);
  }

  @Post("/userInfoDetail")
  @ApiBearerAuth()
  @ApiHeader({
    name: 'X-CSRF-TOKEN',
    description: '请输入token令牌',
  })
  @ApiOperation({description:"用户详情"})
  @UseInterceptors(new LoggingInterceptor({data:"用户详情",logType:"operationLog",operationType:operationTypeEnum.search}))
  userInfoDetail(@Body("uid") uid) {
    return this.userService.userDetailByUserId(uid);
  }

  @NoAuth()
  @Post("/login")
  @ApiOperation({description:"登录"})
  @UseInterceptors(new LoggingInterceptor({data:"登录",logType:"loginLog",operationType:operationTypeEnum.other}))
  async login(@Body() LoginDto:LoginDto,@IpAddress() clientIp: string){
    let {username,password,operationSystem,browser,userType} = LoginDto
    return await this.userService.login({ username, password,ip:clientIp,operationSystem,browser,userType });
  }

  @NoAuth()
  @Post('/randomAccountLogin')
  @ApiOperation({description:"随机登录账号"})
  @UseInterceptors(new LoggingInterceptor({data:"随机登录账号",logType:"loginLog",operationType:operationTypeEnum.other}))
  async randomAccountLogin(@Body() LoginDto:LoginDto,@IpAddress() clientIp: string){
    let {username,password,operationSystem,browser} = LoginDto
    return await this.userService.randomAccountLogin({ username, password,ip:clientIp,operationSystem,browser });
  }


  @NoAuth()
  @Post("/logout")
  @ApiOperation({description:"退出登陆"})
  @UseInterceptors(new LoggingInterceptor({data:"退出登陆",logType:"operationLog",operationType:operationTypeEnum.other}))
  async logout(@Body("uid") id:number,@Body("token") token:string){
    return await this.userService.logout(id,token);
  }

  @Post("/userInfo")
  @ApiBearerAuth()
  @ApiHeader({
    name: 'X-CSRF-TOKEN',
    description: '请输入token令牌',
  })
  @ApiOperation({description:"获取用户信息"})
  @UseInterceptors(new LoggingInterceptor({data:"获取用户信息",logType:"operationLog",operationType:operationTypeEnum.search}))
  async userInfo(@Body() body){
    let token = body.token??""
    if(!token){
      throw new HttpException('token不能为空', HttpStatus.BAD_GATEWAY);
    }
    return await this.userService.userInfo(token);
  }

  @Post('/userChangeStatus')
  @ApiBearerAuth()
  @ApiHeader({
    name: 'X-CSRF-TOKEN',
    description: '请输入token令牌',
  })
  @ApiOperation({description:"修改用户状态"})
  @UseInterceptors(new LoggingInterceptor({data:"修改用户状态",logType:"operationLog",operationType:operationTypeEnum.edit}))
  userChangeStatus(@Body("id") id: number,@Body("status") status:string|number) {
    return this.userService.userChangeStatus(id,status);
  }

  @Post('/onlineUserList')
  @ApiBearerAuth()
  @ApiHeader({
    name: 'X-CSRF-TOKEN',
    description: '请输入token令牌',
  })
  @ApiOperation({description:"在线用户列表"})
  @UseInterceptors(new LoggingInterceptor({data:"在线用户列表",logType:"operationLog",operationType:operationTypeEnum.search}))
  onlineUserList(@Body() onlineUserListDto:OnlineUserListDto){
    return this.userService.onlineUserList(onlineUserListDto);
  }

  @Post('/changeStatusExit')
  @ApiBearerAuth()
  @ApiHeader({
    name: 'X-CSRF-TOKEN',
    description: '请输入token令牌',
  })
  @ApiOperation({description:"修改状态为退出"})
  @UseInterceptors(new LoggingInterceptor({data:"修改状态为退出",logType:"operationLog",operationType:operationTypeEnum.edit}))
  changeStatusExit(@Body("id") id: number) {
    return this.userService.changeStatusExit(id);
  }

  @Get('/oauth/gitee')
  @ApiOperation({description:"获取gitee的token进行重定向"})
  @UseInterceptors(new LoggingInterceptor({data:"获取gitee的token进行重定向",logType:"operationLog",operationType:operationTypeEnum.otherLogin}))
  async gitee(@Res() response: Response,@Query("uid") uid:string) {
    let url:any = await this.userService.giteeToRedirect(uid)
    if(url){
      response.redirect(url)
    }else{
      return url;
    }
  }

  //gitee登录
  @NoAuth()
  @Post('/oauth/giteeLogin')
  @ApiOperation({description:"gitee登录"})
  @UseInterceptors(new LoggingInterceptor({data:"gitee登录",logType:"operationLog",operationType:operationTypeEnum.otherLogin}))
  giteeLogin(@Body() giteeLoginDto:GiteeLoginDto,@IpAddress() clientIp: string) {
    return this.userService.getGiteeLoginInfo(giteeLoginDto,clientIp);
  }
  //gitee登录
  @NoAuth()
  @Post('/unbindGitee')
  @ApiOperation({description:"gitee解绑"})
  @UseInterceptors(new LoggingInterceptor({data:"gitee解绑",logType:"operationLog",operationType:operationTypeEnum.edit}))
  unbindGitee(@Body() bodyData:any) {
    return this.userService.unbindGitee(bodyData.uid,bodyData.token);
  }

  //qq登录
  @NoAuth()
  @Get('/oauth/qq')
  @ApiOperation({description:"获取qq的code进行重定向"})
  @UseInterceptors(new LoggingInterceptor({data:"获取qq的code进行重定向",logType:"operationLog",operationType:operationTypeEnum.otherLogin}))
  async qqLogin(@Res() response: Response,@Query("uid") uid:string) {
    let url:any = await this.userService.qqToRedirect(uid)
    if(url){
      response.redirect(url)
    }else{
      return url;
    }
  }
  //qq登录
  @NoAuth()
  @Post('/oauth/qqLogin')
  @ApiOperation({description:"qq登录"})
  @UseInterceptors(new LoggingInterceptor({data:"qq登录",logType:"operationLog",operationType:operationTypeEnum.otherLogin}))
  async getQQInfo(@Body() qqLoginDto:QqLoginDto,@IpAddress() clientIp: string) {
    return this.userService.getQQLoginInfo(qqLoginDto,clientIp);
  }

  //qq登录
  @Post('/unbindQQ')
  @ApiOperation({description:"qq解绑"})
  @UseInterceptors(new LoggingInterceptor({data:"qq解绑",logType:"operationLog",operationType:operationTypeEnum.edit}))
  unbindQQ(@Body() bodyData:any) {
    return this.userService.unbindQQ(bodyData.uid,bodyData.token);
  }

  @NoAuth()
  @Post('/isExistSysConfig')
  @ApiOperation({description:"配置的系统文件是否存在"})
  @UseInterceptors(new LoggingInterceptor({data:"配置的系统文件是否存在",logType:"operationLog",operationType:operationTypeEnum.otherLogin}))
  async isExistSysConfig(@Body("type") type){
    return await this.userService.isExistSysConfig(type)
  }


}
