import { Module } from '@nestjs/common';
import { KeyboardHookService } from './keyboard-hook.service';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [EventEmitterModule.forRoot()],
  controllers: [],
  providers: [KeyboardHookService],
  exports: [KeyboardHookService],
})
export class TranslatorKeyboardHookModule {}
