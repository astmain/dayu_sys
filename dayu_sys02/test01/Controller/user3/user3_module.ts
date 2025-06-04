import { Module } from "@nestjs/common";
// 自定义
import { user3 } from "./user3";

@Module({
  controllers: [user3],
  providers: [],
})
export class user3_module {}
