import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {SysConfigEntity} from "./entities/sysConfig.entity";
import {Repository} from "typeorm";
import {MsgService} from "@/modules/common/msg/msg.service";
import { SendEmailDto, SendSmsDto, SysConfigUpdateDto } from '@/modules/sysConfig/dto';
import { handleGetCode } from '@/utils/utils';
import { emailAliConfig, emailQQConfig } from '@/utils/config';
import { RedisInstance } from '@/common/redis';
import { emailEnum, redisEnum, sysConfigEnum, textMsgEnum } from '@/common/enum';
import { UserEntity } from '@/modules/user/entities/user.entity';
import { RoleEntity } from '@/modules/role/entities/role.entity';

@Injectable()
export class SysConfigService {
  constructor(@InjectRepository(SysConfigEntity) private readonly sysConfigEntity:Repository<SysConfigEntity>,
              @InjectRepository(UserEntity) private readonly userEntity:Repository<UserEntity>,
              @InjectRepository(RoleEntity) private readonly roleEntity:Repository<RoleEntity>,
              private readonly msgService:MsgService) {
  }

  /**
   * 系统配置
   * @param key
   */
  async sysConfig(key:string,uid:number|string) {
    let userData = await this.userEntity.createQueryBuilder().where({ id:uid }).getOne()
    let roleNum = 0;
    if(userData) {
      roleNum = await this.roleEntity.createQueryBuilder().where({ roleName: "试用角色",id:userData.roleId }).getCount()
    }
    if(roleNum>0){
      return this.msgService.success([]);
    }
    let sysConfigData;
    try {
      sysConfigData = await this.sysConfigEntity.createQueryBuilder("sysConfig").select(["value"]).where("sysConfig.key = :key",{key}).getRawOne()
    }catch (error) {
      return this.msgService.fail(error);
    }
    return this.msgService.success(sysConfigData);
  }


  /**
   * 更新
   * @param sysConfigUpdateDto
   */
  async sysConfigUpdate(sysConfigUpdateDto:SysConfigUpdateDto) {
    let {key,value} = sysConfigUpdateDto
    try {
      await this.sysConfigEntity.createQueryBuilder().where("key = :key", { key }).update().set({value}).execute();
    }catch (error) {
      return this.msgService.fail(error);
    }
    return this.msgService.success();
  }
  /**
   * 发送邮箱
   * @param sendEmailDto
   */
  async sendEmail(sendEmailDto:SendEmailDto) {
    let {toEmail} = sendEmailDto
    //判断用哪个邮箱发送
    let key = sysConfigEnum.baseSetting
    try {
      let sysConfigData = await this.handleGetSysData(key)
      if(sysConfigData.email==emailEnum.qqEmail){
        await this.handleSendQqEmail(toEmail)
      }else if(sysConfigData.email==emailEnum.aliEmail){
        await this.handleSendAliEmail(toEmail)
      }
    }catch (error) {
      return this.msgService.fail(error);
    }
    return this.msgService.success();
  }

  //发送qq邮箱
  async handleSendQqEmail (toEmail:string){
    let redis = new RedisInstance("email",redisEnum.email)
    const nodemailer = require("nodemailer");
    return new Promise(async (resolve, reject)=>{
      let key = sysConfigEnum.qqEmail
      let sysConfigData = await this.handleGetSysData(key)
      if(!sysConfigData.fromEmail || !sysConfigData.fromEmail){
        reject(false)
      }
      emailQQConfig.auth.user=sysConfigData.fromEmail
      emailQQConfig.auth.pass=sysConfigData.smtp
      // 创建发送邮件的请求对象
      let transporter = nodemailer.createTransport(emailQQConfig)
      let verificationCode = handleGetCode(6)
      // 邮件信息
      let mailObj = {
        from: sysConfigData.fromEmail, // 发送方邮箱及标题
        to: toEmail, // 对方邮箱地址
        subject: '【vuecms】账号注册与校验', //
        html: `邮件验证码是：<b>${verificationCode}</b>（如非本人操作，请忽略该信息）` // html格式
      };
      transporter.sendMail(mailObj);
      redis.set(toEmail,verificationCode)

      resolve(true)
    })
  }
  //发送阿里邮箱
  async handleSendAliEmail (toEmail:string){
    let redis = new RedisInstance("email",redisEnum.email)
    const nodemailer = require("nodemailer");
    return new Promise(async (resolve, reject)=>{
      let key = sysConfigEnum.aliEmail
      let sysConfigData = await this.handleGetSysData(key)
      if(!sysConfigData.fromEmail || !sysConfigData.fromEmail){
        reject(false)
      }
      emailAliConfig.auth.user=sysConfigData.fromEmail
      emailAliConfig.auth.pass=sysConfigData.smtp
      // 创建发送邮件的请求对象
      let transporter = nodemailer.createTransport(emailAliConfig)
      let verificationCode = handleGetCode(6)
      // 邮件信息
      let mailObj = {
        from: sysConfigData.fromEmail, // 发送方邮箱及标题
        to: toEmail, // 对方邮箱地址
        subject: '【vuecms】账号注册与校验', //
        html: `邮件验证码是：<b>${verificationCode}</b>（如非本人操作，请忽略该信息）` // html格式
      };
      transporter.sendMail(mailObj);
      redis.set(toEmail,verificationCode)

      resolve(true)
    })
  }
  //获取系统配置数据
  async handleGetSysData(key:string):Promise<any>{
    let sysConfigData = await this.sysConfigEntity.createQueryBuilder("sysConfig").select(["value"]).where("sysConfig.key = :key",{key}).getRawOne()
    sysConfigData = sysConfigData?JSON.parse(sysConfigData["value"]):""
    if(!sysConfigData){
      return false;
    }
    return sysConfigData
  }


  /**
   * 发送短信
   * @param sendSmsDto
   */
  async sendSms(sendSmsDto:SendSmsDto) {
    let {phoneNumber} = sendSmsDto
    //判断用哪个邮箱发送
    let key = sysConfigEnum.baseSetting
    try {
      let sysConfigData = await this.handleGetSysData(key)
      if(sysConfigData.textMsg==textMsgEnum.txTextMsg){
        await this.handleSendTxTextMsg(phoneNumber)
      }else if(sysConfigData.email==textMsgEnum.aliTextMsg){
        await this.handleSendAliTextMsg(phoneNumber)
      }
    }catch (error) {
      return this.msgService.fail(error);
    }
    return this.msgService.success();
  }
  //发送腾讯短信
  async handleSendTxTextMsg (phoneNumber:string){
    let redis = new RedisInstance("textMsg",redisEnum.textMsg)
    let QcloudSms = require("qcloudsms_js");
    return new Promise(async (resolve, reject)=>{
      let key = sysConfigEnum.txTextMsg
      let sysConfigData = await this.handleGetSysData(key)
      if(!sysConfigData.appid || !sysConfigData.appkey || !sysConfigData.smsSign){
        reject(false)
      }
      let appid = sysConfigData.appid;
      let appkey = sysConfigData.appkey;
      let phoneNumbers = [phoneNumber];
      // 短信模板ID，需要在短信应用中申请
      let templateId = 7839;  // NOTE: 这里的模板ID`7839`只是一个示例，真实的模板ID需要在短信控制台中申请
      let smsSign = sysConfigData.smsSign;//签名
      let qcloudsms = QcloudSms(appid, appkey);
      function callback(err, res, resData) {
        if (err) {
          console.log("err: ", err);
        } else {
          console.log("request data: ", res.req);
          console.log("response data: ", resData);
        }
      }
      let ssender = qcloudsms.SmsSingleSender();
      let code = handleGetCode(4);
      let smsType = 0;
      ssender.send(smsType,86, phoneNumbers[0],`【vuecms】您的验证码是: ${code}`, "", "", callback);  // 签名参数不能为空串
      redis.set(phoneNumber,code)
      resolve(true)
    })
  }
  //发送阿里短信
  async handleSendAliTextMsg (phoneNumber:string){
    let redis = new RedisInstance("textMsg",redisEnum.textMsg)
    const SMSClient = require('@alicloud/sms-sdk');
    return new Promise(async (resolve, reject)=>{
      let key = sysConfigEnum.aliTextMsg
      let sysConfigData = await this.handleGetSysData(key)
      if(!sysConfigData.id || !sysConfigData.secret || !sysConfigData.signName){
        reject(false)
      }
      // 设置值
      let accessKeyId = sysConfigData.id;// AccessKey ID
      let secretAccessKey = sysConfigData.secret;// AccessKey Secret
      let signName = sysConfigData.signName; // 签名名称
      let templateCode = "xxx";// 短信模板code
      // 初始化sms_client
      const smsClient = new SMSClient({accessKeyId, secretAccessKey})
      let phoneNum = phoneNumber;//手机号
      // 生成六位随机验证码
      let code = handleGetCode(4);
      // 开始发送短信
      await smsClient.sendSMS({
        PhoneNumbers: phoneNum,
        SignName: signName, //签名名称 前面提到要准备的
        TemplateCode: templateCode, //模版CODE  前面提到要准备的
        TemplateParam: `{"code":'${code}'}`, // 短信模板变量对应的实际值，JSON格式
      }).then(result => {
        console.log("result：", result)
        let {Code} = result;
        if (Code == 'OK') {
          redis.set(phoneNumber,code)
          resolve(true)
        }
      }).catch(err => {
        console.log("报错：", err);
        resolve(false)
      })
    })
  }
}
