import { Module } from '@nestjs/common';

import { user2_controller } from './user2_controller';

@Module({
  providers: [],
  controllers: [user2_controller]
})
export class user2_module { }
