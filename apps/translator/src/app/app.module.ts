import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TranslatorKeyboardHookModule } from '@translator/keyboard-hook';
import { TranslatorGoogleApiModule } from '@translator/google-api';
import { TranslatorConfigPanelModule } from '@translator/config-panel';

@Module({
  imports: [
    TranslatorKeyboardHookModule,
    TranslatorGoogleApiModule,
    TranslatorConfigPanelModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
