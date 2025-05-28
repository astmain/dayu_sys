import { Module } from '@nestjs/common';
import { invoice_infos } from './invoice_infos';

@Module({
  controllers: [invoice_infos],
  providers: [],
})
export class invoice_infos_Module {}
