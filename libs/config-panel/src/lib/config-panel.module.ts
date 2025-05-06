import { Module } from '@nestjs/common';
import { ConfigPanelService } from './config-panel.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [ConfigPanelService],
  exports: [ConfigPanelService],
})
export class TranslatorConfigPanelModule {}
