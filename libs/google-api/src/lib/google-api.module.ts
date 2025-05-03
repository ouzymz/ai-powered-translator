import { Module } from '@nestjs/common';
import { GoogleApiService } from './google-apr.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TranslatorConfigPanelModule } from '@translator/config-panel';

@Module({
  imports: [EventEmitterModule.forRoot(), TranslatorConfigPanelModule],
  controllers: [],
  providers: [GoogleApiService],
  exports: [],
})
export class TranslatorGoogleApiModule {}
