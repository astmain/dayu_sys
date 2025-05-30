import { Module } from '@nestjs/common';
import { StatusMonitorService } from './statusMonitor.service';
import { StatusMonitorController } from './statusMonitor.controller';

@Module({
  imports:[],
  controllers: [StatusMonitorController],
  providers: [StatusMonitorService]
})
export class StatusMonitorModule {}
