import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TranslatorKeyboardHookModule } from '@translator/keyboard-hook';
import { TranslatorGoogleApiModule } from '@translator/google-api';
import { TranslatorConfigPanelModule } from '@translator/config-panel';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TranslatorKeyboardHookModule,
    TranslatorGoogleApiModule,
    TranslatorConfigPanelModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
