//*- coding = utf-8 -*-
//@Time : 2023-10-26 11:27
//@Author : 管茂良
//@File : noAuth.decorator.js
//@web  : www.php-china.com
//@Software: WebStorm

import { SetMetadata } from '@nestjs/common';

export const isPublicKey = 'isPublic'
export const NoAuth = ()=>{
  return SetMetadata(isPublicKey,true)
}