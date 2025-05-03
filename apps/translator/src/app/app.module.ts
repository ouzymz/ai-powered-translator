import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TranslatorKeyboardHookModule } from '@translator/keyboard-hook';
import { TranslatorGoogleApiModule } from '@translator/google-api';

@Module({
  imports: [TranslatorKeyboardHookModule, TranslatorGoogleApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
