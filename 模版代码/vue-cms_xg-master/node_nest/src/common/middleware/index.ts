//*- coding = utf-8 -*-
//@Time : 2022-11-10 23:40
//@Author : 沉默小管
//@File : index.js
//@web  : golangblog.blog.csdn.net
//@Software: WebStorm
import {NestMiddleware} from '@nestjs/common';

import { Response, Request, NextFunction } from 'express';

/**
 * 自定义中间件
 */
export class MiddlewareCustom implements NestMiddleware{

  async use(req: Request, res: Response, next:NextFunction): Promise<any> {

    next()
  }
}