import {HttpException, HttpStatus, Injectable} from '@nestjs/common';

@Injectable()
export class MsgService {
  public fail(message:string, code?:HttpStatus){
    if (code) {
      throw new HttpException(message,code);
    } else {
      throw new HttpException(message,HttpStatus.NOT_FOUND);
    }
  }
  public success(data?:any){
    if (!data) data = "OK";

    return data;
  }
  //公共返回值格式
  public commonRes(data,msg){
    return {
      data,msg
    }
  }
}
