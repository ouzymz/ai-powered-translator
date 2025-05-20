import { Module } from '@nestjs/common';
import { KeyboardHookService } from './keyboard-hook.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TranslatorConfigPanelModule } from '@translator/config-panel';

@Module({
  imports: [EventEmitterModule.forRoot(), TranslatorConfigPanelModule],
  controllers: [],
  providers: [KeyboardHookService],
  exports: [KeyboardHookService],
})
export class TranslatorKeyboardHookModule {}
