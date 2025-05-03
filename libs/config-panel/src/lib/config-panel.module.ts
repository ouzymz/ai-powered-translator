import { Module } from '@nestjs/common';
import { ConfigPanelService } from './config-panel.service';

@Module({
  controllers: [],
  providers: [ConfigPanelService],
  exports: [ConfigPanelService],
})
export class TranslatorConfigPanelModule {}
